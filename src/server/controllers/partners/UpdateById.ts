import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typePartners } from '../../database/models';
import { partnersProviders } from '../../database/providers/Partners';

import * as yup from 'yup';

//  TYPE PARAMS
type typeParamsProps = {
    id?: number;
};

type typeBodyProps = Partial<Omit<typePartners, 'id' | 'id_user'>>;

// PARAMS AND BODY VALIDATION
export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(
        yup.object({
            id: yup.number().integer().optional().moreThan(0),
        }),
    ),
    body: getSchema<typeBodyProps>(
        yup.object({
            first_name: yup.string().optional(),
            last_name: yup.string().optional().min(3),
            cpf: yup.string().optional().min(3),
            email: yup.string().email().optional().min(3),
            percentage: yup.number().optional().moreThan(0),
        }),
    ),
}));

// UPDATE INFOS OF A COLLABORATORS
export const updateById = async (
    req: Request<typeParamsProps, {}, typeBodyProps>,
    res: Response,
) => {
    // Check there are a body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            errors: {
                default: 'O corpo da requisição não pode estar vazio.',
            },
        });
    }

    // Check there are a id
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await partnersProviders.update(
        req.body,
        Number(req.params.id),
        Number(req.headers.IdUser),
    );

    // Check there are a error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(200).json({ result: 'UPDATED A COLABORATOR' });
};
