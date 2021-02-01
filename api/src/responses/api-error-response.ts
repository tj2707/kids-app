import { IApiResponse } from './api-response';

class ApiErrorResponse<T> implements IApiResponse {
  public readonly statusCode: number = 500;
  public headers: any = {
    'Access-Control-Allow-Origin': '*'
  }
  public body: string;

  constructor(message: string) {
    this.body = message;
  }
}

export { ApiErrorResponse };
