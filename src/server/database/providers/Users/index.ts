import * as create from './Create';
import * as getByUsername from './GetByUsername';

export const userProviders = {
    ...create,
    ...getByUsername,
};
