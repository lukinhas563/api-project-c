import * as create from './Create';
import * as deleteById from './Delete';
import * as updateById from './Update';
import * as getById from './GetById';

export const colaboratorsProviders = {
    ...create,
    ...deleteById,
    ...updateById,
    ...getById,
};
