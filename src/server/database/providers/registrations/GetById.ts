import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeRegistrations } from '../../models';

export const getById = async (
    idRegistration: number,
    idUser: number,
): Promise<typeRegistrations | Error> => {
    try {
        const result = await Knex(EnumTableNames.registrations)
            .select('*')
            .where('id', '=', idRegistration)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
