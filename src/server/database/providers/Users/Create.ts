import { PasswordCrypto } from '../../../shared/services';
import { EnumTableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { typeUser } from '../../models';

export const create = async (user: Omit<typeUser, 'id'>) => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(user.password_hash);

        const [result] = await Knex(EnumTableNames.users)
            .insert({ ...user, password_hash: hashedPassword })
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro.');
    } catch (error) {
        return new Error('Erro ao cadastrar o registro.');
    }
};
