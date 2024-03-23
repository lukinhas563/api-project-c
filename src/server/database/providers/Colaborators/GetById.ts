import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeColaborator } from '../../models';

export const getById = async (
    idColaborator: number,
    idUser: number,
): Promise<typeColaborator | Error> => {
    try {
        const result = await Knex(EnumTableNames.colaborators)
            .select('*')
            .where('id', '=', idColaborator)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
