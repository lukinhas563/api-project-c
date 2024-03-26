import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeAddress } from '../../models';

export const getById = async (idAddress: number, idUser: number): Promise<typeAddress | Error> => {
    try {
        const result = await Knex(EnumTableNames.address)
            .select('*')
            .where('id', '=', idAddress)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
