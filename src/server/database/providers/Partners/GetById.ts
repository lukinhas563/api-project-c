import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typePartners } from '../../models';

export const getById = async (idPartner: number, idUser: number): Promise<typePartners | Error> => {
    try {
        const result = await Knex(EnumTableNames.partners)
            .select('*')
            .where('id', '=', idPartner)
            .andWhere('id_user', '=', idUser)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado.');
    } catch (error) {
        console.log(error);

        return new Error('Erro ao localizar o registro.');
    }
};
