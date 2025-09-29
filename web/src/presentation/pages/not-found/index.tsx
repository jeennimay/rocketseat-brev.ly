import { AssetsImg } from '@/ds';
import type { FC } from 'react';
import { NavLink } from 'react-router';

const NotFound: FC = () => {
  return (
    <div className="bg-gray-200 h-dvh w-dvw flex items-center justify-center p-3">
      <div className="bg-gray-100 md:px-12 md:py-16 md:max-w-[580px] max-w-[366px] w-full px-5 py-12 flex flex-col items-center justify-center gap-6 rounded-lg">
        <figure className="m-0 p-0 box-border w-full md:max-w-[194px] max-w-[164px]">
          <img
            src={AssetsImg.NotFound}
            alt="404"
            className="w-full h-auto object-contain"
          />
        </figure>
        <h4 className="text-xl leadign-xl font-bold text-gray-600 m-0 p-0 box-border text-center">
          Link não encontrado
        </h4>
        <p className="text-md leading-md font-semibold text-gray-500 text-center">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em&nbsp;
          <span>
            <NavLink to="/" className="text-blue-base">
              brev.ly
            </NavLink>
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
