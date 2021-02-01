import { IApiResponse } from './api-response';

class ApiSuccessResponse<T> implements IApiResponse {
  public readonly statusCode: number = 200;
  public headers: any = {
    'Access-Control-Allow-Origin': '*'
  }
  public body: string;

  constructor(data: T) {
    this.body = JSON.stringify(data);
  }
}

export { ApiSuccessResponse };
