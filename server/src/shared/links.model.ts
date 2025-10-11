export type LinkResquest = {
  url: string;
  shortLink: string;
};

export type LinkResponse = {
  id: string;
  url: string;
  shortLink: string;
  createdAt: Date;
  countVisits: number;
};

export type LinksResponse = Array<LinkResponse>;

export type LinksReport = {
  reportUrl: string;
};
