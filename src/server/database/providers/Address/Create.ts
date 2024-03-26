import { EnumTableNames } from '../../ETablesNames';
import { typeAddress } from '../../models';
import { Knex } from '../../knex';

export const create = async (address: typeAddress): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.address).insert(address).returning('id');

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
