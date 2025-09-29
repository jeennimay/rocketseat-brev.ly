import { AssetsImg, Loading } from '@/ds';
import { useEffect, useState, type FC } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router';

const Redirect: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { urlRedirect } = useParams();

  const [link] = useState(state?.link || null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isValid = /^[a-zA-Z0-9]+$/.test(urlRedirect || '');

    if (!link || link.shortUrl !== urlRedirect || !isValid) {
      navigate('/url/not-found');
      return;
    }

    setIsLoading(false);

    const timer = setTimeout(() => {
      window.location.href = link.originalUrl;
    }, 5000);

    return () => clearTimeout(timer);
  }, [link, navigate, urlRedirect]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-200 h-dvh w-dvw flex items-center justify-center p-3">
      <div className="bg-gray-100 md:px-12 md:py-16 md:max-w-[580px] max-w-[366px] w-full px-5 py-12 flex flex-col items-center justify-center gap-6 rounded-lg">
        <figure className="m-0 p-0 box-border w-12">
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
              <NavLink to={link?.originalUrl} className="text-blue-base">
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
