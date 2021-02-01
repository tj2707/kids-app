export const SERVICE_IDENTIFIERS = {
  ITaskRepository: Symbol('ITaskRepository'),
  IUserRepository: Symbol('IUserRepository'),
  IUserTaskRepository: Symbol('IUserTaskRepository'),
  IUserTaskLogRepository: Symbol('IUserTaskLogRepository'),
  ISsmService: Symbol('ISsmService')
}

export const MODEL_TAGS = {
  TaskItem: 'TaskItem',
  User: 'User',
  UserTask: 'UserTask',
  UserTaskLog: 'UserTaskLog'
}

export const MODEL_NAME_TAG = 'modelName';