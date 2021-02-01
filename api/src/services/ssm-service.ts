import * as AWS from 'aws-sdk';
import * as config from '../config/config.json';
import { injectable } from 'inversify';

interface ISsmService {
  getParamByName(name: string): Promise<any>;
  getAllParams(): Promise<any>;
  getMappings(): Promise<any>;
}

@injectable()
class SsmService implements ISsmService {
  private readonly ssm = new AWS.SSM();
  private readonly basePath: string;
  private params: any;

  constructor() {
    this.basePath = config.SsmBasePath;
  }

  public async getMappings(): Promise<any> {
    return config.ConfigMappings;
  }

  public async getAllParams(): Promise<any> {
    if (this.params) {
      return Promise.resolve(this.params.api);
    }

    return await this.getParamsByPath(this.basePath)
    .then((params) => {
      this.params = params;
      return this.params.api;
    });
  }

  public async getParamByName(name: string): Promise<any> {
    return this.params[name];
  }

  private async getParamsByPath(path: string) {
    var params: AWS.SSM.GetParametersByPathRequest = {
      Path: path,
      Recursive: true,
      WithDecryption: true
    };
    var data = await this.ssm.getParametersByPath(params).promise();
    let obj = {};
    data.Parameters.forEach((param) => {
      const paramKey = param.Name.replace(path, '');
      const splitKey = paramKey.split('/').reverse();
      this.populateObjValues(splitKey, paramKey, param.Value, obj);
    });
    return obj;
  }

  private populateObjValues(allKeys: string[], fullKey: string, value: string, obj: any) {
    const key = allKeys.pop();
    if (!obj.hasOwnProperty(key)) {
      if (!allKeys.length) {
        obj[key] = value;
        return;
      } else {
        obj[key] = {};
      }
    }
    this.populateObjValues(allKeys, fullKey, value, obj[key]);
  }
}

export { ISsmService, SsmService };