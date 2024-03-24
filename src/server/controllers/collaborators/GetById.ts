import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { collaboratorsProviders } from '../../database/providers/Collaborators';

import * as yup from 'yup';

// VALIDADE ID PARAMETER
const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

// PARAMS VALIDATION
export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
}));

// GET COLLABORATOR BY ID
export const getById = async (req: Request<typeParamsProps>, res: Response) => {
    // Check the existence of parameters
    if (!req.params.id)
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });

    const result = await collaboratorsProviders.getById(req.params.id, Number(req.headers.IdUser));

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
