/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpRequest = {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: any;
  observer?: string;
  responseType?: any;
  timeout?: number;
};

export enum HttpMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}

export type HttpMethod =
  | HttpMethods.get
  | HttpMethods.post
  | HttpMethods.put
  | HttpMethods.patch
  | HttpMethods.delete;

export interface HttpClient<R = any> {
  get: (data: HttpRequest) => Promise<HttpResponse<R>>;
  post: (data: HttpRequest) => Promise<HttpResponse<R>>;
  put: (data: HttpRequest) => Promise<HttpResponse<R>>;
  patch: (data: HttpRequest) => Promise<HttpResponse<R>>;
  delete: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  serverTimeout = 504,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
  headers?: any;
};

/* eslint-enable @typescript-eslint/no-explicit-any */
