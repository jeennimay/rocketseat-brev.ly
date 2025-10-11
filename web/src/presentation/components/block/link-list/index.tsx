import { Fragment, type FC } from 'react';
import { NavLink } from 'react-router';
import type { LinkList as LinksType } from '@/data/models/link';
import { Button, CopyIcon, LinkIcon, TrashIcon } from '@ds/index';

export type LinkListProps = {
  links?: LinksType;
  isLoading?: boolean;
  copyLink?: (shortLink: string) => void;
  deleteLink?: (shortLink: string) => void;
};

const LinkList: FC<LinkListProps> = ({
  links,
  isLoading,
  copyLink,
  deleteLink,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 pb-6 pt-4">
        <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!links?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 pb-6 pt-4">
        <LinkIcon size={32} color="gray-400" />
        <p className="text-gray-500 text-xs leading-xs uppercase">
          ainda não existem links cadastrados
        </p>
      </div>
    );
  }
  return (
    <ul className='max-h-[50dvh] overflow-y-auto custom-scrollbar pr-3 box-border"'>
      {links.map((link, index) => (
        <Fragment key={link.id}>
          <li
            key={link.id}
            className="flex gap-5 items-center py-0.5 box-border"
          >
            <div className="w-full">
              <NavLink
                to={link.shortLink}
                className="text-blue-base text-md leading-md font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
              >{`brev.ly/${link.shortLink}`}</NavLink>
              <p className="text-gray-500 text-sm leading-sm mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
                {link.url}
              </p>
            </div>
            <span className="text-gray-500 text-sm leading-sm whitespace-nowrap">
              {`${link.countVisits} acesso${link.countVisits > 1 ? 's' : ''}`}
            </span>
            <div className="flex flex-nowrap shrink-0 gap-1">
              <Button
                variant="secondary"
                isOnlyIcon
                onClick={() => copyLink?.(link.shortLink)}
              >
                <CopyIcon size={16} color="gray-600" />
              </Button>
              <Button
                variant="secondary"
                isOnlyIcon
                onClick={() => deleteLink?.(link.shortLink)}
              >
                <TrashIcon size={16} color="gray-600" />
              </Button>
            </div>
          </li>
          {index !== links.length - 1 && (
            <div className="w-full h-px bg-gray-200 my-4" />
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default LinkList;
