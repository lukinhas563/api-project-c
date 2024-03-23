import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeColaborator } from '../../database/models';
import { colaboratorsProviders } from '../../database/providers/Colaborators';
import * as yup from 'yup';

type typeBodyColaborator = Omit<typeColaborator, 'id' | 'id_user'>;

// VALIDATION BODY OF CREATE
export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            photo: yup.string().optional(),
            first_name: yup.string().required().min(3).max(150),
            last_name: yup.string().optional().min(3).max(150),
            cpf: yup.string().optional().min(11),
            email: yup.string().optional().email().min(5),
        }),
    ),
}));

export const create = async (req: Request<{}, {}, typeBodyColaborator>, res: Response) => {
    const result = await colaboratorsProviders.create({
        ...req.body,
        id_user: Number(req.headers.IdUser),
    });

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res
        .status(201)
        .json({ result: 'CREATED A COLABORATOR NEW COLABORATOR', return: result });
};
