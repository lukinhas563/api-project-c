import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeCompany } from '../../models';

export const update = async (
    company: Partial<Omit<typeCompany, 'id'>>,
    id: number,
    idUser: number,
    idCollaborator: number,
): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.companies)
            .where('id', '=', id)
            .andWhere('id_user', '=', idUser)
            .andWhere('id_collaborator', '=', idCollaborator)
            .update(company);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
};
