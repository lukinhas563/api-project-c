import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';

const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

const bodyPropsSchema = yup.object({
    first_name: yup.string().optional().min(3),
    last_name: yup.string().optional().min(3),
    cpf: yup.string().optional().min(11),
    email: yup.string().email().optional(),
});

type typeBodyProps = yup.InferType<typeof bodyPropsSchema>;

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
    body: getSchema<typeBodyProps>(bodyPropsSchema),
}));

export const updateById = async (
    req: Request<typeParamsProps, {}, typeBodyProps>,
    res: Response,
) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(500).json({ result: 'UPDATE A COLABORATOR BY ID NOT IMPLEMENTED' });
};
