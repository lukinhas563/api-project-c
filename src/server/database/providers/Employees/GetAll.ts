import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const getAll = async (
    page: number,
    limit: number,
    filter: string,
    IdUser: number,
    id = 0,
) => {
    try {
        const result = await Knex(EnumTableNames.employees)
            .select(
                'employees.*',
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
            .leftJoin(EnumTableNames.address, 'employees.id', 'address.id_employee')
            .where('employees.id', id)
            .orWhere('employees.first_name', 'like', `%${filter}%`)
            .andWhere('employees.id_user', IdUser)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = await Knex(EnumTableNames.employees)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar os registros.');
    }
};
