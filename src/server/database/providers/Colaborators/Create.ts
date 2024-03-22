import { EnumTableNames } from '../../ETablesNames';
import { typeColaborator } from '../../models';
import { Knex } from '../../knex';

export const create = async (colaborator: Omit<typeColaborator, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.colaborators)
            .insert(colaborator)
            .returning('id');

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
