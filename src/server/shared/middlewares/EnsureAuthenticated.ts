import { RequestHandler } from 'express';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado',
            },
        });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado',
            },
        });
    }

    if (token !== 'TOKEN.TEST') {
        return res.status(401).json({
            errors: {
                default: 'Não autenticado',
            },
        });
    }
    return next();
};
