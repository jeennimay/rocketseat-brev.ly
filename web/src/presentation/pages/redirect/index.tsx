import { useEffect, useState, type FC } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router';
import { AssetsImg, Loading } from '@ds/index';
import { useLinksData } from '@/store/links';

const Redirect: FC = () => {
  const navigate = useNavigate();
  const { urlRedirect } = useParams();
  const { links } = useLinksData();
  const originalUrl =
    links.find(link => link.shortLink === urlRedirect)?.url || '/url/not-found';

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isValid = /^[a-zA-Z0-9_]+$/.test(urlRedirect || '');
    const existLink = links.find(link => link.shortLink === urlRedirect);

    if (!isValid || !existLink) {
      navigate('/url/not-found', { replace: true });
      return;
    }

    setIsLoading(false);

    const timer = setTimeout(() => {
      window.location.href = existLink.url;
    }, 3000);

    return () => clearTimeout(timer);
  }, [links, navigate, urlRedirect]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-200 h-dvh w-dvw flex items-center justify-center p-3">
      <div className="bg-gray-100 md:px-12 md:py-16 md:max-w-[580px] max-w-[366px] w-full px-5 py-12 flex flex-col items-center justify-center gap-6 rounded-lg">
        <figure className="m-0 p-0 box-border w-12 animate-pulse">
          <img
            src={AssetsImg.LogoIcon}
            alt="brev.ly logo"
            className="w-full h-auto object-contain"
          />
        </figure>
        <h4 className="text-xl leadign-xl font-bold text-gray-600 m-0 p-0 box-border text-center">
          Redirecionando...
        </h4>
        <div>
          <p className="text-md leading-md font-semibold text-gray-500 text-center p-0 m-0 box-border">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-md leading-md font-semibold text-gray-500 text-center">
            Não foi redirecionado?&nbsp;
            <span>
              <NavLink to={originalUrl} className="text-blue-base">
                Acesse aqui
              </NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
