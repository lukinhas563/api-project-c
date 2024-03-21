import { typeColaborator, typeUser } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        users: typeUser;
        colaborators: typeColaborator;
        // companies: typeCompany
    }
}
