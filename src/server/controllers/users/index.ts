import * as create from './Create';
import * as getUser from './Login';

export const UsersController = {
    ...create,
    ...getUser,
};
