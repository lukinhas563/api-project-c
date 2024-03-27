import * as create from './Create';
import * as deleteById from './Delete';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as count from './Count';
import * as update from './Update';
import * as getAllByCompany from './GetAllByCompany';

export const secondary_economic_activityProviders = {
    ...create,
    ...deleteById,
    ...getById,
    ...getAll,
    ...count,
    ...update,
    ...getAllByCompany,
};
