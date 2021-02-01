import Axios, { AxiosResponse, AxiosInstance, Method } from 'axios';
import { injectable } from 'inversify';

interface IHttpRequest {
  url: string;
  payload?: any;
}

interface IHttpService {
  get(request: IHttpRequest): Promise<AxiosResponse>;
  post(request: IHttpRequest): Promise<AxiosResponse>;
  put(request: IHttpRequest): Promise<AxiosResponse>;
  delete(request: IHttpRequest): Promise<AxiosResponse>;
}

@injectable()
class HttpService implements IHttpService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = Axios.create({
      baseURL: process.env.VUE_APP_BASE_API_URL,
    });
  }


  public async get(request: IHttpRequest): Promise<AxiosResponse> {
    return this.makeRequest(request, 'GET');
  }

  public async post(request: IHttpRequest): Promise<AxiosResponse> {
    return this.makeRequest(request, 'POST');
  }

  public async put(request: IHttpRequest): Promise<AxiosResponse> {
    return this.makeRequest(request, 'PUT');
  }

  public async delete(request: IHttpRequest): Promise<AxiosResponse> {
    return this.makeRequest(request, 'DELETE');
  }

  private async makeRequest(request: IHttpRequest, method: Method): Promise<AxiosResponse> {
    return this.instance.request({
      url: request.url,
      method,
      data: request.payload,
    })
      .then(res => res);
  }
}

export { IHttpRequest, IHttpService, HttpService };
