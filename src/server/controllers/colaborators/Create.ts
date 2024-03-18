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

const filterSchema = yup.object({
    filter: yup.string().min(3),
});

type IFilter = yup.InferType<typeof filterSchema>;

export const createBodyValidation = validation((getSchema) => ({
    body: getSchema<IColaborator>(colaboratorSchema),
    query: getSchema<IFilter>(filterSchema),
}));

export const create = async (req: Request<{}, {}, IColaborator>, res: Response) => {
    console.log(req.body, req.query);

    return res.json({ result: 'CREATE A COLABORATOR', body: req.body });
};
