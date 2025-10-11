import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import type HomeDataSource from '@/data/data-source/home';
import type { LinkList } from '@/data/models/link';
import { useLinksData } from '@/store/links';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import enviroment from '@/infra/config';

export interface HomeUseCaseProps {
  links: LinkList;
  copyLink: (shortLink: string) => void;
  deleteLink: (shortLink: string) => void;
}

export default function HomeUseCase(source: HomeDataSource): HomeUseCaseProps {
  const { links, setLinks } = useLinksData();

  const copyLink = (shortLink: string) => {
    copyToClipboard(`${enviroment.feUrl}/${shortLink}`);
  };

  const deleteLink = async (shortLink: string) => {
    const response = await source.deleteLink(shortLink);
    console.log(response);
    if (isAxiosError(response)) {
      return;
    }
    getLinks();
  };

  const getLinks = async () => {
    const response = await source.getLinks();
    if (isAxiosError(response) || !(response instanceof Array)) {
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
