import { EnumTableNames } from '../../ETablesNames';
import { typeTasks } from '../../models';
import { Knex } from '../../knex';

export const create = async (task: typeTasks, collaborator: number): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.tasks).insert(task).returning('id');

        const relation = {
            id_task: result.id,
            id_collaborator: collaborator,
        };

        await Knex(EnumTableNames.tasks_collaborators).insert(relation);

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
