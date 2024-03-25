import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as update from './UpdateById';

export const secondary_economic_activityController = {
    ...create,
    ...deleteById,
    ...getById,
    ...getAll,
    ...update,
};
