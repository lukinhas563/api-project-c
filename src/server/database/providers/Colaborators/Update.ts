import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeColaborator } from '../../models';

export const update = async (
    colaborator: Partial<Omit<typeColaborator, 'id' | 'id_user'>>,
    id: number,
): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.colaborators)
            .where('id', '=', id)
            .update(colaborator);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
};
