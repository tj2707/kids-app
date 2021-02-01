import { TaskItem } from '../models';
import { ITaskRepository } from '../repositories';
import { ApiBadResponse, ApiSuccessResponse, ApiErrorResponse } from '../responses';
import { container } from '../ioc/ioc.config';
import { SERVICE_IDENTIFIERS } from '../ioc/service-identifiers';

const repository: ITaskRepository = container.get(SERVICE_IDENTIFIERS.ITaskRepository);

const createTask = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing task');
    }

    let task: TaskItem = JSON.parse(event.body);
    if (task == null) {
      return new ApiBadResponse('Invalid task');
    }

    task = await repository.create(task);
    
    return new ApiSuccessResponse(task);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const deleteTask = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing task ID');
    }

    await repository.delete(id);
    
    return new ApiSuccessResponse('Task deleted');
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getTask = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing task ID');
    }

    const task = await repository.getById(id);
    
    return new ApiSuccessResponse(task);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getAllTasks = async (event) => {
  try {
    const tasks = await repository.getAll();
    
    return new ApiSuccessResponse(tasks);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const updateTask = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing task');
    }

    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing task ID');
    }

    const task: TaskItem = JSON.parse(event.body);
    if (task == null) {
      return new ApiBadResponse('Invalid task');
    }

    await repository.update(id, task);
    
    return new ApiSuccessResponse(task);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

export { createTask, deleteTask, getTask, getAllTasks, updateTask };
