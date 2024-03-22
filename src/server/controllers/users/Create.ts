import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeUser } from '../../database/models';
import * as yup from 'yup';
import { userProviders } from '../../database/providers/Users';

type typeBodyUser = Omit<typeUser, 'id'>;

export const createUserValidation = validation((getSchema) => ({
    body: getSchema<typeBodyUser>(
        yup.object({
            user_name: yup.string().required().min(3),
            first_name: yup.string().required().min(3),
            last_name: yup.string().required().min(3),
            cpf: yup.string().required().min(11),
            email: yup.string().email().required().min(3),
            password_hash: yup.string().required().min(3),
        }),
    ),
}));

export const create = async (req: Request<{}, {}, typeBodyUser>, res: Response) => {
    const result = await userProviders.create(req.body);

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'USER CREATED', user: result });
};
