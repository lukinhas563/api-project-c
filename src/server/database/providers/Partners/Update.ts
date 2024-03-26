import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typePartners } from '../../models';

export const update = async (
    partner: Partial<Omit<typePartners, 'id'>>,
    id: number,
    idUser: number,
): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.partners)
            .where('id', '=', id)
            .andWhere('id_user', '=', idUser)
            .update(partner);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
};
