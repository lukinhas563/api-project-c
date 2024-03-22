import * as create from './Create';
import * as deleteById from './Delete';
import * as updateById from './Update';

export const colaboratorsProviders = {
    ...create,
    ...deleteById,
    ...updateById,
};
