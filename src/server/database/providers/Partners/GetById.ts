import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typePartners } from '../../models';

export const getById = async (idPartner: number, idUser: number): Promise<typePartners | Error> => {
    try {
        const result = await Knex(EnumTableNames.partners)
            .select(
                'partners.*',
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
            .leftJoin(EnumTableNames.address, 'partners.id', 'address.id_partner')
            .where('partners.id', '=', idPartner)
            .andWhere('partners.id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
