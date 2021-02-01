const SERVICE_IDENTIFIERS = {
  IHttpService: Symbol.for('IHttpService'),
  IJsonService: Symbol.for('IJsonService'),
  IUserService: Symbol.for('IUserService'),
  ITaskService: Symbol.for('ITaskService'),
  IUserTaskService: Symbol.for('IUserTaskService'),
  IUserTaskLogService: Symbol.for('IUserTaskLogService'),
};

const CONSTRUCTOR_ARG_IDENTIFIERS = {
  ResourceName: 'resourceName',
  ClassRef: 'classRef',
};

export { SERVICE_IDENTIFIERS, CONSTRUCTOR_ARG_IDENTIFIERS };
