import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { injectable } from 'inversify';

interface IJsonService {
    deserialize<T>(data: any, classRef: { new(...args: any[]): T; }): Promise<T>;
    deserializeArray<T>(data: any, classRef: { new(...args: any[]): T; }): Promise<T[]>;
    serialize(data: any): any;
    serializeArray(data: any[]): any;
}

@injectable()
class JsonService implements IJsonService {
    private jsonConvert: JsonConvert = new JsonConvert();

    constructor() {
      this.jsonConvert.operationMode = OperationMode.ENABLE;
      this.jsonConvert.ignorePrimitiveChecks = false;
      this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
    }

    public async deserialize<T>(data: any, classRef: { new(...args: any[]): T; }): Promise<T> {
      try {
        const response: T = this.jsonConvert.deserialize(data, classRef) as T;
        return response;
      } catch (error) {
        throw error;
      }
    }

    public async deserializeArray<T>(data: any, classRef: { new(...args: any[]): T; }): Promise<T[]> {
      try {
        const response: T[] = this.jsonConvert.deserializeArray(data, classRef);
        return response;
      } catch (error) {
        throw error;
      }
    }

    public serialize(data: any): any {
      return this.jsonConvert.serialize(data);
    }

    public serializeArray(data: any[]): any {
      return this.jsonConvert.serializeArray(data);
    }
}

export { IJsonService, JsonService };
