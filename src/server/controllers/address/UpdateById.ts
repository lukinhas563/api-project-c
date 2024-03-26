import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeAddress } from '../../database/models';
import { addressProviders } from '../../database/providers/Address';

import * as yup from 'yup';

//  TYPE PARAMS
type typeParamsProps = {
    id?: number;
};

type typeBodyProps = Partial<
    Omit<typeAddress, 'id' | 'id_user' | 'id_company' | 'id_partner' | 'id_employee'>
>;

// PARAMS AND BODY VALIDATION
export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(
        yup.object({
            id: yup.number().integer().optional().moreThan(0),
        }),
    ),
    body: getSchema<typeBodyProps>(
        yup.object({
            street: yup.string().optional().min(5),
            number: yup.string().optional(),
            complement: yup.string().optional().min(3),
            city: yup.string().optional().min(3),
            state: yup.string().optional(),
            zip_code: yup.string().optional().min(5),
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
            error: {
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

    const result = await addressProviders.update(
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
