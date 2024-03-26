import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const count = async (filter = '', IdUser: number) => {
    try {
        const [{ count }] = await Knex(EnumTableNames.address)
            .where('street', 'like', `%${filter}%`)
            .andWhere('id_user', IdUser)
            .count<[{ count: number }]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao localizar os registros.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar os registros.');
    }
};
