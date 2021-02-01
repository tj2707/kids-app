import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';
import { Promise } from 'bluebird';
import { injectable } from 'inversify';
import { User, TaskItem, UserTask, UserTaskLog } from '../models';
import { ISsmService } from '../services/ssm-service';
import { container } from '../ioc/ioc.config';
import { SERVICE_IDENTIFIERS } from '../ioc/service-identifiers';

interface IRepository<T extends Model<any>> {
  create(obj: T): Promise<T>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  update(id: number, obj: T): Promise<void>;
}

@injectable()
class Repository<T extends Model<any>> implements IRepository<T> {
  private readonly modelName: string;
  private readonly ssm: ISsmService = container.get(SERVICE_IDENTIFIERS.ISsmService);

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  public async create(obj: T): Promise<T> {
    return this.getDataContext()
    .then((db) => {
      const model = this.getModelInstance(db);
      return model.create<T>(obj);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
  
  public async delete(id: number): Promise<void> {
    await this.getDataContext()
    .then((db) => {
      const model = this.getModelInstance(db);
      model.destroy({
        where: { id }
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  public async getById(id: number): Promise<T> {
    return this.getDataContext()
    .then((db) => {
      const model = this.getModelInstance(db);
      return model.findByPk<T>(id);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  public async getAll(): Promise<Array<T>> {
    return this.getDataContext()
    .then((db) => {
      const model = this.getModelInstance(db);
      return model.findAll<T>();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  public async update(id: number, task: T): Promise<void> {
    this.getDataContext()
    .then((db) => {
      const model = this.getModelInstance(db);
      model.update(task, {
        where: { id }
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }

  protected getDataContext(): Promise<Sequelize> {
    return new Promise((resolve, reject) => {
      return this.ssm.getAllParams()
      .then((params) => {
        const db = this.initSequelize(params);
        db.authenticate()
        .then(() => {
          resolve(db);
        })
        .catch((err) => {
          reject(err);
        });
      });
    });
  }

  protected initSequelize(params: any): Sequelize {
    return new Sequelize({
        database: params.database.name,
        username: params.database.username,
        password: params.database.password,
        dialect: 'mysql',
        host: params.database.host,
        models: [ 
          User,
          TaskItem,
          UserTask,
          UserTaskLog
        ]
      });
  }

  protected getModelInstance(db: Sequelize): ModelCtor<T> {
    return (db.model(this.modelName) as ModelCtor<T>);
  }
}

export { IRepository, Repository };
