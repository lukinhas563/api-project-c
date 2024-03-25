import { EnumTableNames } from '../../ETablesNames';
import { typeSecondary_economic_activity } from '../../models';
import { Knex } from '../../knex';

export const create = async (
    activity: Omit<typeSecondary_economic_activity, 'id'>,
): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.secondary_economic_activity)
            .insert(activity)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro.');
    }
};
