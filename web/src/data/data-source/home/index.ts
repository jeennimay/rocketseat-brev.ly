import type {
  Link,
  LinkList,
  LinkReport,
  NewLink,
  ResponseError,
} from '@/data/models/link';
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http';
import enviroment from '@/infra/config';

export default class HomeDataSource {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly httpClient: HttpClient<any>) {}

  public getLinks = (): Promise<LinkList> => {
    const url = `${enviroment.beUrl}/links`;

    return this.httpClient
      .get({ url, headers: { 'Content-Type': 'application/json' } })
      .then((response): LinkList => {
        const { body } = response;

        if (response.statusCode === HttpStatusCode.ok) {
          return body.links;
        }

        return body;
      });
  };

  public getLinksReport = (): Promise<LinkReport | ResponseError> => {
    const url = `${enviroment.beUrl}/links/report`;

    return this.httpClient
      .get({ url, headers: { 'Content-Type': 'application/json' } })
      .then((response): LinkReport | ResponseError => {
        const { body } = response;

        if (response.statusCode === HttpStatusCode.ok) {
          return body;
        }

        return body.error;
      });
  };

  public createLink = (parameters: NewLink): Promise<Link | ResponseError> => {
    const url = `${enviroment.beUrl}/link`;

    return this.httpClient
      .post({
        url,
        headers: { 'Content-Type': 'application/json' },
        body: {
          url: parameters.originalUrl,
          shortLink: parameters.shortUrl,
        },
      })
      .then((response): Link | ResponseError => {
        const { body } = response;

        if (response.statusCode === HttpStatusCode.created) {
          return body;
        }

        return body.error;
      });
  };

  public deleteLink = (
    parameter: NewLink['shortUrl']
  ): Promise<{ message: string }> => {
    const url = `${enviroment.beUrl}/link/${parameter}`;

    return this.httpClient
      .delete({ url, headers: { 'Content-Type': 'application/json' } })
      .then((response): { message: string } => {
        const { body } = response;

        return {
          message: body.message,
        };
      });
  };
}
