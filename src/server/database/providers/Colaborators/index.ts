import * as create from './Create';
import * as deleteById from './Delete';
import * as updateById from './Update';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as count from './Count';

export const colaboratorsProviders = {
    ...create,
    ...deleteById,
    ...updateById,
    ...getById,
    ...getAll,
    ...count,
};
