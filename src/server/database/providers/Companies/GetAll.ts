import { formattedResult } from '../../../shared/services';
import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const getAll = async (
    page: number,
    limit: number,
    filter: string,
    IdUser: number,
    idCollaborator: number,
    id = 0,
) => {
    try {
        const result = await Knex(EnumTableNames.companies)
            .select(
                'companies.*',
                'secondary_economic_activity.id as economic_id',
                'secondary_economic_activity.code',
                'secondary_economic_activity.activity',
                'secondary_economic_activity.id_company',
                'secondary_economic_activity.created_at as economic_created_at',
                'secondary_economic_activity.updated_at as economic_updated_at',
                'partners.id as partner_id',
                'partners.first_name',
                'partners.last_name',
                'partners.cpf',
                'partners.email',
                'partners.percentage',
                'partners.created_at as partner_created_at',
                'partners.updated_at as partner_updated_at',
            )
            .leftJoin(
                EnumTableNames.secondary_economic_activity,
                'companies.id',
                'secondary_economic_activity.id_company',
            )
            .leftJoin(
                EnumTableNames.companies_partners,
                'companies.id',
                'companies_partners.id_company',
            )
            .leftJoin(EnumTableNames.partners, 'partners.id', 'companies_partners.id_partner')
            .where('companies.id', id)
            .orWhere('companies.company_name', 'like', `%${filter}%`)
            .andWhere('companies.id_user', IdUser)
            .andWhere('companies.id_collaborator', '=', idCollaborator)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = await Knex(EnumTableNames.companies)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...result, resultById];
        }

        const newFormat = formattedResult(result);

        return newFormat;
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar os registros.');
    }
};
