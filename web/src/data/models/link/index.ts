export type ResponseError = {
  error?: Error;
};

export type Link = {
  id: string;
  url: string;
  shortLink: string;
  createdAt: string;
  countVisits: number;
};

export type LinkList = Array<Link>;

export type NewLink = {
  originalUrl: string;
  shortUrl: string;
};

export type LinkReport = {
  reportUrl: string
}