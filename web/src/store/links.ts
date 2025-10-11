import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { LinkList } from "@/data/models/link"

type LinksState = {
    links: LinkList,
    setLinks: (links: LinkList) => void
}

export const useLinksData = create<LinksState, [['zustand/immer', never]]>(immer((set) => ({
    links: [{
        id: '2',
        url: 'https://www.example.com/page2',
        shortLink: 'def456',
        createdAt: '2025-09-29T12:00:00Z',
        countVisits: 74,
    },],
    setLinks: (links) => set({ links })
})))