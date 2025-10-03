import type { ReactNode } from 'react';
import { AssetsImg, Button, Download, Input } from '@/ds';
import { LinkList } from '@/presentation/components';

const Home = (): ReactNode => {
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
            links={[
              {
                id: '1',
                originalUrl: 'https://www.example.com/page1',
                shortUrl: 'abc123',
                createdAt: '2025-09-28T12:00:00Z',
                accessCount: 102,
              },
              {
                id: '2',
                originalUrl: 'https://www.example.com/page2',
                shortUrl: 'def456',
                createdAt: '2025-09-29T12:00:00Z',
                accessCount: 74,
              },
              {
                id: '3',
                originalUrl: 'https://www.dev.to/articles/react-lazy-loading',
                shortUrl: 'react1',
                createdAt: '2025-09-28T19:05:00Z',
                accessCount: 145,
              },
              {
                id: '4',
                originalUrl: 'https://pt.wikipedia.org/wiki/Tailwind_CSS',
                shortUrl: 'tail2025',
                createdAt: '2025-09-27T21:38:00Z',
                accessCount: 82,
              },
              {
                id: '5',
                originalUrl: 'https://github.com/typescript-cheatsheets/react',
                shortUrl: 'gh-ts',
                createdAt: '2025-09-26T17:54:00Z',
                accessCount: 230,
              },
              {
                id: '6',
                originalUrl: 'https://news.ycombinator.com/item?id=2025',
                shortUrl: 'hn2025',
                createdAt: '2025-09-25T11:20:00Z',
                accessCount: 91,
              },
            ]}
            isLoading={false}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
