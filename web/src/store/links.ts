import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { LinkList } from '@/data/models/link';

type LinksState = {
  links: LinkList;
  setLinks: (links: LinkList) => void;
};

export const useLinksData = create<LinksState, [['zustand/immer', never]]>(
  immer(set => ({
    links: [],
    setLinks: links => set({ links }),
  }))
);
