import { injectable, inject } from 'inversify';
import { IHttpService } from '@/app-modules/http';
import { IJsonService } from '@/app-modules/json/json-service';
import { SERVICE_IDENTIFIERS } from '@/app-modules/ioc/service-identifiers';

interface IDataService<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  save(task: T): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

@injectable()
class DataService<T> implements IDataService<T> {
  protected readonly httpService: IHttpService;

  protected readonly jsonService: IJsonService;

  protected readonly resourceName: string;

  protected readonly classRef: { new(...args: any[]): T; };

  constructor(
      @inject(SERVICE_IDENTIFIERS.IHttpService) httpService: IHttpService,
      @inject(SERVICE_IDENTIFIERS.IJsonService) jsonService: IJsonService,
        resourceName: string,
        classRef: { new(...args: any[]): T; },
  ) {
    this.httpService = httpService;
    this.jsonService = jsonService;
    this.resourceName = resourceName;
    this.classRef = classRef;
  }

  protected async deserialize(data: any): Promise<T> {
    return this.jsonService.deserialize<T>(data, this.classRef);
  }

  protected async deserializeArray(data: any): Promise<T[]> {
    return this.jsonService.deserializeArray<T>(data, this.classRef);
  }

  public async get(id: number): Promise<T> {
    return this.httpService.get({ url: `/${this.resourceName}/${id}` })
      .then((response) => {
        const data = this.deserialize(response.data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }

  public async getAll(): Promise<T[]> {
    return this.httpService.get({ url: `/${this.resourceName}` })
      .then((response) => {
        const data = this.deserializeArray(response.data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }

  public async save(obj: T): Promise<boolean> {
    const data = this.jsonService.serialize(obj);
    return this.httpService.post({ url: `/${this.resourceName}`, payload: data })
      .then(response => response.status === 200)
      .catch((err) => {
        throw err;
      });
  }

  public async delete(id: number): Promise<boolean> {
    return this.httpService.delete({ url: `/${this.resourceName}/${id}` })
      .then(response => response.status === 200)
      .catch((err) => {
        throw err;
      });
  }
}

export { IDataService, DataService };
