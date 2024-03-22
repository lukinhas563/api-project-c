import * as create from './Create';
import * as deleteById from './Delete';
import * as updateById from './Update';
import * as getById from './GetById';
import * as getAll from './GetAll';

export const colaboratorsProviders = {
    ...create,
    ...deleteById,
    ...updateById,
    ...getById,
    ...getAll,
};
