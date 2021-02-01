import { UserTask } from '../models';
import { IUserTaskRepository } from '../repositories';
import { ApiBadResponse, ApiSuccessResponse, ApiErrorResponse } from '../responses';
import { container } from '../ioc/ioc.config';
import { SERVICE_IDENTIFIERS } from '../ioc/service-identifiers';

const repository: IUserTaskRepository = container.get(SERVICE_IDENTIFIERS.IUserTaskRepository);

const createUserTask = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user task');
    }

    let userTask: UserTask = JSON.parse(event.body);
    if (userTask == null) {
      return new ApiBadResponse('Invalid user task');
    }

    userTask = await repository.create(userTask);
    
    return new ApiSuccessResponse(userTask);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const deleteUserTask = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task ID');
    }

    await repository.delete(id);
    
    return new ApiSuccessResponse('User task deleted');
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTask = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task ID');
    }

    const userTask = await repository.getById(id);
    
    return new ApiSuccessResponse(userTask);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getAllUserTasks = async (event) => {
  try {
    const userTasks = await repository.getAll();
    
    return new ApiSuccessResponse(userTasks);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const updateUserTask = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user task');
    }

    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user task ID');
    }

    const userTask: UserTask = JSON.parse(event.body);
    if (userTask == null) {
      return new ApiBadResponse('Invalid user task');
    }

    await repository.update(id, userTask);
    
    return new ApiSuccessResponse(userTask);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTasksByUserId = async (event) => {
  try {
    const userId = event.pathParameters ? event.pathParameters.userId : 0;
    if (!userId){
      return new ApiBadResponse('Missing user ID');
    }

    const userTasks = await repository.getByUserId(userId);
    
    return new ApiSuccessResponse(userTasks);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTasksByTaskId = async (event) => {
  try {
    const taskId = event.pathParameters ? event.pathParameters.taskId : 0;
    if (!taskId){
      return new ApiBadResponse('Missing task ID');
    }

    const userTasks = await repository.getByTaskId(taskId);
    
    return new ApiSuccessResponse(userTasks);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUserTasksByWeekday = async (event) => {
  try {
    const weekday = event.pathParameters ? event.pathParameters.weekday : -1;
    if (weekday < 0){
      return new ApiBadResponse('Missing weekday');
    }

    const userTasks = await repository.getByWeekday(weekday);
    
    return new ApiSuccessResponse(userTasks);
  } catch (err) {
    return new ApiErrorResponse(err);
  }
}

export { 
  createUserTask, 
  deleteUserTask, 
  getUserTask, 
  getAllUserTasks, 
  updateUserTask, 
  getUserTasksByUserId, 
  getUserTasksByTaskId,
  getUserTasksByWeekday
};
