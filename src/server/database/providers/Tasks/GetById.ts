import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeTasks } from '../../models';

export const getById = async (idTask: number, idUser: number): Promise<typeTasks | Error> => {
    try {
        const result = await Knex(EnumTableNames.tasks)
            .select('*')
            .where('id', '=', idTask)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
