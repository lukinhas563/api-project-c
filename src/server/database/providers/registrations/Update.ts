import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeRegistrations } from '../../models';

export const update = async (
    colaborator: Partial<Omit<typeRegistrations, 'id'>>,
    id: number,
    idUser: number,
): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.registrations)
            .where('id', '=', id)
            .andWhere('id_user', '=', idUser)
            .update(colaborator);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
};
