import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeColaborator } from '../../database/models';
import * as yup from 'yup';

type typeParamsProps = {
    id?: number;
};

type typeBodyProps = Partial<Omit<typeColaborator, 'id' | 'id_user'>>;

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(
        yup.object({
            id: yup.number().integer().optional().moreThan(0),
        }),
    ),
    body: getSchema<typeBodyProps>(
        yup.object({
            photo: yup.string().optional(),
            first_name: yup.string().optional().min(3),
            last_name: yup.string().optional().min(3),
            cpf: yup.string().optional().min(11),
            email: yup.string().email().optional(),
        }),
    ),
}));

export const updateById = async (
    req: Request<typeParamsProps, {}, typeBodyProps>,
    res: Response,
) => {
    console.log(req.params);
    console.log(req.body);

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'O corpo da requisição não pode estar vazio.' });
    }

    return res.status(500).json({ result: 'UPDATE A COLABORATOR BY ID NOT IMPLEMENTED' });
};
