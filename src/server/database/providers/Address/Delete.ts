import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const deleteById = async (addressId: number, IdUser: number): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.address)
            .where('id', '=', addressId)
            .andWhere('id_user', '=', IdUser)
            .del();

        if (result > 0) return;

        return new Error('Erro ao deletar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar o registro.');
    }
};
