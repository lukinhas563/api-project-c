import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as update from './UpdateById';

export const AddressController = {
    ...create,
    ...deleteById,
    ...getAll,
    ...getById,
    ...update,
};
