import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeColaborator } from '../../database/models';
import * as yup from 'yup';
import { colaboratorsProviders } from '../../database/providers/Colaborators';

type typeBodyColaborator = Omit<typeColaborator, 'id'>;

export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            photo: yup.string().optional(),
            first_name: yup.string().required().min(3),
            last_name: yup.string().optional().min(3),
            cpf: yup.string().optional().min(11),
            email: yup.string().optional().required(),
            id_user: yup.number().integer().required(),
        }),
    ),
}));

export const create = async (req: Request<{}, {}, typeBodyColaborator>, res: Response) => {
    const result = await colaboratorsProviders.create(req.body);

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
