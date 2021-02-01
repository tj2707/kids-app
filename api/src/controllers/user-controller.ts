import { User } from '../models';
import { IUserRepository } from '../repositories';
import { ApiBadResponse, ApiSuccessResponse, ApiErrorResponse } from '../responses';
import { container } from '../ioc/ioc.config';
import { SERVICE_IDENTIFIERS } from '../ioc/service-identifiers';

const repository: IUserRepository = container.get(SERVICE_IDENTIFIERS.IUserRepository);

const createUser = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user');
    }

    let user: User = JSON.parse(event.body);
    if (user == null) {
      return new ApiBadResponse('Invalid task');
    }
    
    user = await repository.create(user);
    
    return new ApiSuccessResponse(user);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const deleteUser = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user ID');
    }

    await repository.delete(id);
    
    return new ApiSuccessResponse('User deleted');
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getUser = async (event) => {
  try {
    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user ID');
    }

    const user = await repository.getById(id);
    
    return new ApiSuccessResponse(user);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const getAllUsers = async (event) => {
  try {
    const users = await repository.getAll();
    
    return new ApiSuccessResponse(users);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

const updateUser = async (event) => {
  try {
    const body = event.body;
    if (body == null) {
      return new ApiBadResponse('Missing user');
    }

    const id = event.pathParameters ? event.pathParameters.id : 0;
    if (!id){
      return new ApiBadResponse('Missing user ID');
    }

    const user: User = JSON.parse(event.body);
    if (user == null) {
      return new ApiBadResponse('Invalid user');
    }

    await repository.update(id, user);
    
    return new ApiSuccessResponse(user);
      
  } catch (err) {
    return new ApiErrorResponse(err);
  }
};

export { createUser, deleteUser, getUser, getAllUsers, updateUser };
