import { ApiSuccessResponse } from '../responses';

export const ping = async (event) => {
    return new ApiSuccessResponse('pong');
};