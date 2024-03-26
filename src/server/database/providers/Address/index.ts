import * as create from './Create';
import * as deleteById from './Delete';
import * as getAll from './GetAll';
import * as count from './Count';
import * as getById from './GetById';
import * as update from './Update';

export const addressProviders = {
    ...create,
    ...deleteById,
    ...getAll,
    ...count,
    ...getById,
    ...update,
};
