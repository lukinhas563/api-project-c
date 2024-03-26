import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeAddress } from '../../models';

export const update = async (
    address: Partial<Omit<typeAddress, 'id'>>,
    id: number,
    idUser: number,
): Promise<void | Error> => {
    try {
        const result = await Knex(EnumTableNames.address)
            .where('id', '=', id)
            .andWhere('id_user', '=', idUser)
            .update(address);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
};
