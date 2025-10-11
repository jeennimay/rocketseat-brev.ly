import type { Link, NewLink, ResponseError } from '@/data/models/link';
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http';
import enviroment from '@/infra/config';

export default class RedirectDataSource {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly httpClient: HttpClient<any>) {}

  public getLink = (
    parameter: NewLink['shortUrl']
  ): Promise<Link | ResponseError> => {
    const url = `${enviroment.beUrl}/link/${parameter}`;

    return this.httpClient
      .get({ url, headers: { 'Content-Type': 'application/json' } })
      .then((response): Link | ResponseError => {
        const { body } = response;

        if (response.statusCode === HttpStatusCode.ok) {
          return body;
        }

        return body.error;
      });
  };

  public accessLink = (
    parameter: NewLink['shortUrl']
  ): Promise<Link | ResponseError> => {
    const url = `${enviroment.beUrl}/link/${parameter}`;

    return this.httpClient
      .put({ url, headers: { 'Content-Type': 'application/json' } })
      .then((response): Link | ResponseError => {
        const { body } = response;

        if (response.statusCode === HttpStatusCode.ok) {
          return body;
        }

        return body.error;
      });
  };
}
