import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeSecondary_economic_activity } from '../../database/models';
import { secondary_economic_activityProviders } from '../../database/providers/Secondary_economic_activity';

import * as yup from 'yup';

type typeBodyColaborator = Omit<typeSecondary_economic_activity, 'id'>;

// BODY VALIDATION
export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            code: yup.string().required().min(3).max(150),
            activity: yup.string().required().min(3).max(150),
            id_company: yup.number().required().moreThan(0),
        }),
    ),
}));

// CREATE A COLLABORATOR
export const create = async (req: Request<{}, {}, typeBodyColaborator>, res: Response) => {
    // Call the provider
    const result = await secondary_economic_activityProviders.create({
        ...req.body,
        id_company: Number(req.body.id_company),
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
        .json({ result: 'CREATED A SECONDARY ACTIVITY ECONOMIC FOR A COMPANY', return: result });
};
