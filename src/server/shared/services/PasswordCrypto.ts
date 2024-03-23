import { genSalt, hash, compare } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
    const saltGenerate = await genSalt(SALT_RANDOMS);
    const hashPass = await hash(password, saltGenerate);

    return hashPass;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword,
};
