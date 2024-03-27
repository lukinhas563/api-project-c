import * as create from './Create';
import * as deteleByID from './DeleteById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as update from './UpdateById';

export const TasksController = {
    ...create,
    ...deteleByID,
    ...getAll,
    ...getById,
    ...update,
};
