import { EnumTableNames } from '../../ETablesNames';
import { typeUser } from '../../models';
import { Knex } from '../../knex';

export const getByUsername = async (username: string): Promise<typeUser | Error> => {
    try {
        const result = await Knex(EnumTableNames.users)
            .select('*')
            .where('user_name', '=', username)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
