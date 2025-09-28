import { AssetsImg } from '@/ds';
import type { FC } from 'react';
import { Link } from 'react-router';

const Redirect: FC = () => {
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
              <Link to="/" className="text-blue-base">
                Acesse aqui
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
