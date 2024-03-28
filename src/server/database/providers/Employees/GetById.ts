import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeEmployee } from '../../models';

export const getById = async (
    idEmployee: number,
    idUser: number,
): Promise<typeEmployee | Error> => {
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
            .where('employees.id', '=', idEmployee)
            .andWhere('employees.id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
