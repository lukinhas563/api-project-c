import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeSecondary_economic_activity } from '../../models';

export const getById = async (
    idActivity: number,
    idUser: number,
): Promise<typeSecondary_economic_activity | Error> => {
    try {
        const result = await Knex(EnumTableNames.secondary_economic_activity)
            .select('*')
            .where('id', '=', idActivity)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
