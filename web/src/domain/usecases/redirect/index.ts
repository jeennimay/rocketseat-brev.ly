import type RedirectDataSource from '@/data/data-source/redirect';
import type { Link, NewLink } from '@/data/models/link';
import { useLinksData } from '@/store/links';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export interface RedirectUseCaseProps {
  link: NewLink;
  isLoading: boolean;
}

export default function RedirectUseCase(
  source: RedirectDataSource
): RedirectUseCaseProps {
  const navigate = useNavigate();
  const { links } = useLinksData();
  const { urlRedirect } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState<NewLink>({
    shortUrl: '',
    originalUrl: '',
  });

  async function getLink(shortLink: Link['shortLink']) {
    const response = await source.getLink(shortLink);
    if (!response || !('shortLink' in response) || !('url' in response)) {
      return;
    }
    setLink({
      shortUrl: response.shortLink,
      originalUrl: response.url,
    });
  }

  useEffect(() => {
    if (!link.originalUrl && !links?.length && urlRedirect) {
      getLink(urlRedirect);
      return;
    }

    const isValid = /^[a-zA-Z0-9_]+$/.test(urlRedirect || '');
    const existLink = links.find(link => link.shortLink === urlRedirect);
    if (!isValid || (!existLink && !link.originalUrl)) {
      navigate('/url/not-found', { replace: true });
      return;
    }
    setIsLoading(false);

    const timer = setTimeout(() => {
      window.location.href = existLink?.url || link.originalUrl;
    }, 3000);

    return () => clearTimeout(timer);
  }, [link]);

  return {
    link,
    isLoading,
  };
}
