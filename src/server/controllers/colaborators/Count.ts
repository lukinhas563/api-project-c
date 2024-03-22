import { EnumTableNames } from '../../database/ETablesNames';
import { Knex } from '../../database/knex';

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(EnumTableNames.colaborators)
            .where('first_name', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao localizar os registros.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar os registros.');
    }
};
