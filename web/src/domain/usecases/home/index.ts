import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import type HomeDataSource from '@/data/data-source/home';
import type { LinkList } from '@/data/models/link';
import { useLinksData } from '@/store/links';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import enviroment from '@/infra/config';
import { useToast } from '@/store/toast';

export interface HomeUseCaseProps {
  links: LinkList;
  copyLink: (shortLink: string) => void;
  deleteLink: (shortLink: string) => void;
}

export default function HomeUseCase(source: HomeDataSource): HomeUseCaseProps {
  const { links, setLinks } = useLinksData();
  const { addToast } = useToast();

  const copyLink = (shortLink: string) => {
    copyToClipboard(`${enviroment.feUrl}/${shortLink}`);
    addToast({
      variant: 'success',
      title: 'Link copiado com sucesso',
      description: `${enviroment.feUrl}/${shortLink}`,
    });
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
    copyLink,
    deleteLink,
  };
}
