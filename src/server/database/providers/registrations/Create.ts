import { EnumTableNames } from '../../ETablesNames';
import { typeRegistrations } from '../../models';
import { Knex } from '../../knex';

export const create = async (register: Omit<typeRegistrations, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.registrations).insert(register).returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro.');
    }
};
