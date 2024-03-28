import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { registrationsProviders } from '../../database/providers/registrations';

import * as yup from 'yup';

// PARAMETER TYPE
const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

// DELETE PARAMETER VALIDATION
export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
}));

// DELETE ACTIVITY
export const deleteById = async (req: Request<typeParamsProps>, res: Response) => {
    // Verify the parameter
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    // Call the provider
    const result = await registrationsProviders.deleteById(
        Number(req.params.id),
        Number(req.headers.IdUser),
    );

    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'DELETED A REGISTER.', id: result });
};
