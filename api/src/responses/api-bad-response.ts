import { IApiResponse } from './api-response';

class ApiBadResponse implements IApiResponse {
  public readonly statusCode: number = 400;
  public headers: any = {
    'Access-Control-Allow-Origin': '*'
  }
  public body: string;

  constructor(message: string) {
    this.body = message;
  }
}

export { ApiBadResponse };
