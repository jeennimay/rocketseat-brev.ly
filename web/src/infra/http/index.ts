import {
  HttpMethods,
  type HttpRequest,
  type HttpResponse,
} from '@/data/protocols/http';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export default class HttpClient implements HttpClient {
  axiosInstance = axios.create();
  requests: HttpRequest[] = [];

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async onRequest(config: any = {}): Promise<any> {
    return await new Promise(resolve => {
      resolve(config);
    });
  }

  onRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    if (this.requests.length != 0) {
      this.requests.forEach((x: HttpRequest, i: number) => {
        if (response.config.url == x.url) {
          this.requests = this.requests.splice(i, 1);
        }
      });
    }

    return response;
  }

  async onResponseError(
    error: AxiosError
  ): Promise<AxiosError | AxiosResponse> {
    if (!error || !error.isAxiosError) {
      return Promise.reject(error);
    }

    const { config } = error;

    if (!config) {
      return Promise.reject(error);
    }

    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async resolve => {
      const parameters = {
        method: config.method,
        url: config.url || '',
        data: config.data || {},
        headers: config.headers,
        responseType: config.responseType,
      };

      const response = await this.axiosInstance.request(parameters);
      return resolve(response);
    });
  }

  constructor() {
    this.axiosInstance.interceptors.request.use(
      this.onRequest.bind(this),
      this.onRequestError.bind(this)
    );
    this.axiosInstance.interceptors.response.use(
      this.onResponse.bind(this),
      this.onResponseError.bind(this)
    );
  }

  private async request(parameters: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await this.axiosInstance.request({
        ...parameters,
        headers: Object.assign(parameters.headers || {}),
      });
      /* eslint-disable-next-line */
    } catch (error: any) {
      axiosResponse = error?.response;
    }

    return {
      statusCode: axiosResponse.status,
      headers: axiosResponse.headers,
      body: axiosResponse.data,
    };
  }

  public async get(parameters: HttpRequest): Promise<HttpResponse> {
    return await this.request({ ...parameters, method: HttpMethods.get });
  }

  public async post(parameters: HttpRequest): Promise<HttpResponse> {
    return await this.request({ ...parameters, method: HttpMethods.post });
  }

  public async put(parameters: HttpRequest): Promise<HttpResponse> {
    return await this.request({ ...parameters, method: HttpMethods.put });
  }

  public async patch(parameters: HttpRequest): Promise<HttpResponse> {
    return await this.request({ ...parameters, method: HttpMethods.patch });
  }

  public async delete(parameters: HttpRequest): Promise<HttpResponse> {
    return await this.request({ ...parameters, method: HttpMethods.delete });
  }
}
