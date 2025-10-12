import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import type HomeDataSource from '@/data/data-source/home';
import type { LinkList, NewLink } from '@/data/models/link';
import { useLinksData } from '@/store/links';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import enviroment from '@/infra/config';
import { useToast } from '@/store/toast';

export interface HomeUseCaseProps {
  links: LinkList;
  isLoading: boolean;
  newLinkValue: NewLink;
  setNewLinkValue: (value: NewLink) => void;
  copyLink: (shortLink: string) => void;
  deleteLink: (shortLink: string) => void;
  createLink: () => void;
  downloadLinksReport: () => void;
}

export default function HomeUseCase(source: HomeDataSource): HomeUseCaseProps {
  const { links, setLinks } = useLinksData();
  const { addToast } = useToast();
  const [newLinkValue, setNewLinkValue] = useState<NewLink>({
    shortUrl: '',
    originalUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const copyLink = (shortLink: string) => {
    copyToClipboard(`${enviroment.feUrl}/${shortLink}`);
    addToast({
      variant: 'success',
      title: 'Link copiado com sucesso',
      description: `${enviroment.feUrl}/${shortLink}`,
    });
  };

  async function download(url: string) {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'link-report.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileUrl);
  }

  const downloadLinksReport = async () => {
    const response = await source.getLinksReport();
    if (isAxiosError(response) || !('reportUrl' in response)) {
      addToast({ variant: 'error', title: 'Erro ao baixar relatório' });
      return;
    }

    download(response.reportUrl);
  };

  const createLink = async () => {
    setIsLoading(true);
    if (!newLinkValue.originalUrl || !newLinkValue.shortUrl) {
      return;
    }

    const response = await source.createLink(newLinkValue);
    setIsLoading(false);
    if (
      isAxiosError(response) ||
      response instanceof Error ||
      'message' in response
    ) {
      addToast({
        variant: 'error',
        title: 'Tivemos um problema ao criar link',
        description:
          (response?.message as string) || 'Tente novamente mais tarde',
      });
      return;
    }
    addToast({ variant: 'success', title: 'Link criado com sucesso' });
    getLinks();
  };

  const deleteLink = async (shortLink: string) => {
    const response = await source.deleteLink(shortLink);
    if (isAxiosError(response)) {
      addToast({ variant: 'error', title: 'Erro ao deletar link' });
      return;
    }
    addToast({ variant: 'success', title: 'Link deletado com sucesso' });
    getLinks();
  };

  const getLinks = async () => {
    const response = await source.getLinks();
    setIsLoading(false);
    if (isAxiosError(response) || !(response instanceof Array)) {
      addToast({
        variant: 'error',
        title: 'Tivemos um problema ao buscar links',
        description: `${response.message}. Tente novamente mais tarde`,
      });
      return;
    }
    setLinks(response);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return {
    links,
    newLinkValue,
    isLoading,
    setNewLinkValue,
    copyLink,
    deleteLink,
    createLink,
    downloadLinksReport,
  };
}
