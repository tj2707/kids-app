import { UserTaskLog } from '../models';
import { IUserTaskLogRepository } from '../repositories';
import { ApiBadResponse, ApiSuccessResponse, ApiErrorResponse } from '../responses';
import { container } from '../ioc/ioc.config';
import { SERVICE_IDENTIFIERS } from '../ioc/service-identifiers';

const repository: IUserTaskLogRepository = container.get(SERVICE_IDENTIFIERS.IUserTaskLogRepository);

const createUserTaskLog = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user task log');
    }

    let userTaskLog: UserTaskLog = JSON.parse(event.body);
    if (userTaskLog == null) {
      return new ApiBadResponse('Invalid user task log');
    }

    userTaskLog = await repository.create(userTaskLog);
    
    return new ApiSuccessResponse(userTaskLog);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const deleteUserTaskLog = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task log ID');
    }

    await repository.delete(id);
    
    return new ApiSuccessResponse('User task log deleted');
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTaskLog = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task log ID');
    }

    const userTaskLog = await repository.getById(id);
    
    return new ApiSuccessResponse(userTaskLog);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getAllUserTaskLogs = async (event) => {
  try {
    const userTaskLogs = await repository.getAll();
    
    return new ApiSuccessResponse(userTaskLogs);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const updateUserTaskLog = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user task log');
    }

    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task log ID');
    }

    const userTaskLog: UserTaskLog = JSON.parse(event.body);
    if (userTaskLog == null) {
      return new ApiBadResponse('Invalid user task log');
    }

    await repository.update(id, userTaskLog);
    
    return new ApiSuccessResponse(userTaskLog);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTaskLogsByUserTaskId = async (event) => {
  try {
    const userTaskId = event.pathParameters ? event.pathParameters.userTaskId : 0;
    if (!userTaskId){
      return new ApiBadResponse('Missing user task ID');
    }

    const userTaskLogs = await repository.getByUserTaskId(userTaskId);
    
    return new ApiSuccessResponse(userTaskLogs);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTaskLogsByUserTaskIdAndDate = async (event) => {
  try {
    const userTaskId = event.pathParameters ? event.pathParameters.userTaskId : 0;
    if (!userTaskId){
      return new ApiBadResponse('Missing user task ID');
    }

    const date = event.pathParameters ? event.pathParameters.date : '';
    if (!date){
      return new ApiBadResponse('Missing date');
    }

    const userTaskLogs = await repository.getByUserTaskIdAndDate(userTaskId, date);
    
    return new ApiSuccessResponse(userTaskLogs);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

export { 
  createUserTaskLog, 
  deleteUserTaskLog, 
  getUserTaskLog, 
  getAllUserTaskLogs, 
  updateUserTaskLog,
  getUserTaskLogsByUserTaskId,
  getUserTaskLogsByUserTaskIdAndDate 
};
