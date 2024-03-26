import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as updateByID from './UpdateById';

export const PartnersControllers = {
    ...create,
    ...deleteById,
    ...getById,
    ...getAll,
    ...updateByID,
};
