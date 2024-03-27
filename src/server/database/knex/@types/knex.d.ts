import {
    typeAddress,
    typeColaborator,
    typeCompany,
    typeEmployee,
    typePartners,
    typeSecondary_economic_activity,
    typeUser,
} from '../../models';
import { typeTasks } from '../../models/Tasks';

declare module 'knex/types/tables' {
    interface Tables {
        users: typeUser;
        colaborators: typeColaborator;
        companies: typeCompany;
        secondary_economic_activity: typeSecondary_economic_activity;
        partners: typePartners;
        employees: typeEmployee;
        address: typeAddress;
        tasks: typeTasks;
    }
}
