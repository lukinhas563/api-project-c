import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeCollaborator } from '../../database/models';
import { collaboratorsProviders } from '../../database/providers/Collaborators';

import * as yup from 'yup';

type typeBodyColaborator = Omit<typeCollaborator, 'id' | 'id_user'>;

// BODY VALIDATION
export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            first_name: yup.string().required().min(3).max(150),
            last_name: yup.string().optional().min(3).max(150),
            email: yup.string().optional().email().min(5),
        }),
    ),
}));

// CREATE A COLLABORATOR
export const create = async (req: Request<{}, {}, typeBodyColaborator>, res: Response) => {
    // Call the provider
    const result = await collaboratorsProviders.create({
        ...req.body,
        id_user: Number(req.headers.IdUser),
    });

    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res
        .status(201)
        .json({ result: 'CREATED A COLABORATOR NEW COLLABORATOR', return: result });
};
