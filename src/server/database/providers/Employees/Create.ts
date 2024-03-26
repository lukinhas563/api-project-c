import { EnumTableNames } from '../../ETablesNames';
import { typeEmployee } from '../../models';
import { Knex } from '../../knex';

export const create = async (employee: typeEmployee, company: number): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.employees).insert(employee).returning('id');

        const relation = {
            id_company: company,
            id_employee: result.id,
        };

        await Knex(EnumTableNames.companies_employees).insert(relation);

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
