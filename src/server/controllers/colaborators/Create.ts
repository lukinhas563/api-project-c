import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeColaborator } from '../../database/models';
import * as yup from 'yup';

type typeBodyColaborator = Omit<typeColaborator, 'id' | 'id_user'>;

export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            photo: yup.string().optional(),
            first_name: yup.string().required().min(3),
            last_name: yup.string().optional().min(3),
            cpf: yup.string().optional().min(11),
            email: yup.string().optional().required(),
        }),
    ),
}));

export const create = async (req: Request<{}, {}, typeBodyColaborator>, res: Response) => {
    console.log(req.body, req.query);

    return res.status(500).json({ result: 'CREATE A COLABORATOR NOT IMPLEMENTED' });
};
