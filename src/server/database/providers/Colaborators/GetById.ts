import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const getById = async (idColaborator: number, idUser: number) => {
    try {
        const [result] = await Knex(EnumTableNames.colaborators)
            .select('id', 'photo', 'first_name', 'last_name', 'cpf', 'email')
            .where('id', '=', idColaborator)
            .andWhere('id_user', '=', idUser);

        if (typeof result === 'object') {
            return result;
        }

        return new Error('Erro ao localizar o registro.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
