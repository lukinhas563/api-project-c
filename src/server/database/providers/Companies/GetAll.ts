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
                'secondary_economic_activity.id as economic_id', // Activities
                'secondary_economic_activity.code',
                'secondary_economic_activity.activity',
                'secondary_economic_activity.id_company',
                'secondary_economic_activity.created_at as economic_created_at',
                'secondary_economic_activity.updated_at as economic_updated_at',
                'partners.id as partner_id', // Partners
                'partners.first_name',
                'partners.last_name',
                'partners.cpf',
                'partners.email',
                'partners.percentage',
                'partners.created_at as partner_created_at',
                'partners.updated_at as partner_updated_at',
                'employees.id as employe_id', // Employees
                'employees.first_name as employee_first_name',
                'employees.last_name as employee_last_name',
                'employees.cpf as employee_cpf',
                'employees.email as employee_email',
                'employees.role as employee_role',
                'employees.workload as employee_workload',
                'employees.created_at as employee_created_at',
                'employees.updated_at as employee_updated_at',
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
            .leftJoin(
                EnumTableNames.companies_employees,
                'companies.id',
                'companies_employees.id_company',
            )
            .leftJoin(EnumTableNames.employees, 'employees.id', 'companies_employees.id_employee')
            .leftJoin(EnumTableNames.address, 'companies.id', 'address.id_company')
            .where('companies.id', id)
            .orWhere('companies.company_name', 'like', `%${filter}%`)
            .andWhere('companies.id_user', IdUser)
            .andWhere('companies.id_collaborator', idCollaborator)
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
