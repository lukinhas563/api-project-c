import * as jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '..', '.env') });

type typeJWTData = {
    uid: number;
};

const sign = (data: typeJWTData): string | 'JWT_SECRET_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): typeJWTData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === 'string') {
            return 'INVALID_TOKEN';
        }

        return decoded as typeJWTData;
    } catch (error) {
        return 'INVALID_TOKEN';
    }
};

export const JWTService = {
    sign,
    verify,
};
