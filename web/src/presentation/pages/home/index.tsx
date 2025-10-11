import type { ReactNode } from 'react';
import { AssetsImg, Button, Download, Input } from '@ds/index';
import { LinkList } from '@/presentation/components';
import type { HomeUseCaseProps } from '@/domain/usecases/home';

type HomeProps = {
  useCase: HomeUseCaseProps;
};
const Home = (props: HomeProps): ReactNode => {
  const { links, copyLink, deleteLink } = props.useCase;

  return (
    <div className="bg-gray-200 min-h-dvh w-dvw px-3 py-8 box-border">
      <figure className="mx-auto my-0 p-0 box-border h-6 max-w-[980px] flex md:justify-start justify-center">
        <img
          src={AssetsImg.Logo}
          alt="Logo"
          className="w-auto h-full object-contain"
        />
      </figure>
      <div className="flex md:flex-row md:gap-5 md:items-start items-center flex-col gap-3 justify-center mt-8">
        <section className="md:p-8 p-6 bg-gray-100 rounded-lg md:max-w-[380px] w-full">
          <h1 className="text-lg leading-lg font-bold m-0 p-0 box-border">
            Novo link
          </h1>
          <form action="" className="flex flex-col gap-4 md:my-6 my-5">
            <Input
              placeholder="www.exemplo.com.br"
              label="link original"
              name="new-link"
            />
            <Input
              placeholder="brev.ly/"
              label="link encurtado"
              name="short-link"
            />
          </form>
          <Button variant="primary" block>
            Salvar link
          </Button>
        </section>
        <section className="md:p-8 p-6 bg-gray-100 rounded-lg md:max-w-[580px] w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-lg leading-lg font-bold m-0 p-0 box-border">
              Meus links
            </h1>
            <Button
              variant="secondary"
              className="flex gap-1.5 justify-center items-center"
            >
              <Download size={16} />
              <span className="font-semibold text-sm leading-sm">
                Baixar CSV
              </span>
            </Button>
          </div>
          <div className="mb-4 mt-5 w-full h-px bg-gray-200" />
          <LinkList
            links={links}
            isLoading={false}
            copyLink={copyLink}
            deleteLink={deleteLink}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
