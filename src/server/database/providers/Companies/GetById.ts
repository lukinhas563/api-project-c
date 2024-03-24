import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeCompany } from '../../models';

export const getById = async (
    idCompany: number,
    idUser: number,
    idCollaborator: number,
): Promise<typeCompany | Error> => {
    try {
        const result = await Knex(EnumTableNames.companies)
            .select('*')
            .where('id', '=', idCompany)
            .andWhere('id_user', '=', idUser)
            .andWhere('id_collaborator', '=', idCollaborator)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
