export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  accessCount: number;
};

export type LinkList = Array<Link>;

export type NewLink = {
  originalUrl: string;
  shortUrl: string;
};
