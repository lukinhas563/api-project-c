import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const deleteById = async (activityId: number, IdUser: number): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.secondary_economic_activity)
            .where('id', '=', activityId)
            .andWhere('id_user', '=', IdUser)
            .del();

        if (result > 0) return;

        return new Error('Erro ao deletar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro.');
    }
};
