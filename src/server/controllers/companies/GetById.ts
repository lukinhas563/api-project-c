import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { companiesProviders } from '../../database/providers/Companies';

import * as yup from 'yup';

// VALIDATE ID PARAMETER
const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

// VALIDATE ID QUERRY
type typeQueryProps = {
    idCollaborator?: number;
};

// PARAMS VALIDATION
export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
    query: getSchema<typeQueryProps>(
        yup.object({
            idCollaborator: yup.number().optional().moreThan(0),
        }),
    ),
}));

// GET COLLABORATOR BY ID
export const getById = async (
    req: Request<typeParamsProps, {}, {}, typeQueryProps>,
    res: Response,
) => {
    // Check the existence of parameters
    if (!req.params.id)
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });

    if (!req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCollaborator" precisa ser informado.',
            },
        });
    }

    const result = await companiesProviders.getById(
        req.params.id,
        Number(req.headers.IdUser),
        Number(req.query.idCollaborator),
    );

    // Check errors
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(200).json({ result: result });
};
