import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';

const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
}));

export const getById = async (req: Request<typeParamsProps>, res: Response) => {
    console.log(req.params);

    return res.status(500).json({ result: 'GET A COLABORATOR BY ID NOT IMPLEMENTED' });
};
