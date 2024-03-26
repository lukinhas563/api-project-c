import { EnumTableNames } from '../../ETablesNames';
import { typePartners } from '../../models';
import { Knex } from '../../knex';

export const create = async (partner: typePartners, company: number): Promise<number | Error> => {
    try {
        const [result] = await Knex(EnumTableNames.partners).insert(partner).returning('id');

        const relation = {
            id_company: company,
            id_partner: result.id,
        };

        await Knex(EnumTableNames.companies_partners).insert(relation);

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
