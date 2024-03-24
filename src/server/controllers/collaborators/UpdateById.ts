import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeCollaborator } from '../../database/models';
import { collaboratorsProviders } from '../../database/providers/Collaborators';

import * as yup from 'yup';

//  TYPE PARAMS
type typeParamsProps = {
    id?: number;
};

type typeBodyProps = Partial<Omit<typeCollaborator, 'id' | 'id_user'>>;

// PARAMS AND BODY VALIDATION
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

    const result = await collaboratorsProviders.update(
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
