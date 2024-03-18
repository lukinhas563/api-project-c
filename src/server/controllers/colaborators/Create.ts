import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';

const colaboratorSchema = yup.object({
    first_name: yup.string().required().min(3),
    last_name: yup.string().required().min(3),
    cpf: yup.string().required().min(11),
    email: yup.string().email().required(),
});

type IColaborator = yup.InferType<typeof colaboratorSchema>;

export const createValidation = validation((getSchema) => ({
    body: getSchema<IColaborator>(colaboratorSchema),
}));

export const create = async (req: Request<{}, {}, IColaborator>, res: Response) => {
    console.log(req.body, req.query);

    return res.json({ result: 'CREATE A COLABORATOR', body: req.body });
};
