import { formattedResult } from '../../../shared/services';
import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeCompany } from '../../models';

export const getById = async (
    idCompany: number,
    idUser: number,
    idCollaborator: number,
): Promise<typeCompany | Error> => {
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
                'address.id as address_id', // Address
                'address.street',
                'address.number',
                'address.complement',
                'address.city',
                'address.state',
                'address.zip_code',
                'address.created_at as address_created_at',
                'address.updated_at as address_updated_at',
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
            .leftJoin(EnumTableNames.address, 'companies.id', 'address.id_company')
            .where('companies.id', '=', idCompany)
            .andWhere('companies.id_user', '=', idUser)
            .andWhere('companies.id_collaborator', '=', idCollaborator);

        const newFormat = formattedResult(result);

        if (result.length > 0) return newFormat[0];

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
