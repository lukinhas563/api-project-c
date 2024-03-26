import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeEmployee } from '../../models';

export const getById = async (
    idEmployee: number,
    idUser: number,
): Promise<typeEmployee | Error> => {
    try {
        const result = await Knex(EnumTableNames.employees)
            .select('*')
            .where('id', '=', idEmployee)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
