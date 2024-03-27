import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeSecondary_economic_activity } from '../../database/models';
import { secondary_economic_activityProviders } from '../../database/providers/Secondary_economic_activity';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCompany: yup.number().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// BODY VALIDATION
type typeBodyColaborator = Omit<typeSecondary_economic_activity, 'id' | 'id_user' | 'id_company'>;

export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            code: yup.string().required().min(3).max(150),
            activity: yup.string().required().min(3).max(150),
        }),
    ),
}));

// CREATE A COLLABORATOR
export const create = async (
    req: Request<{}, {}, typeSecondary_economic_activity, typeQueryProps>,
    res: Response,
) => {
    // Check the querry
    if (!req.query.idCompany) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCompany" precisa ser informado.',
            },
        });
    }

    // Call the provider
    const result = await secondary_economic_activityProviders.create({
        ...req.body,
        id_company: Number(req.query.idCompany),
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
        .json({ result: 'CREATED A SECONDARY ACTIVITY ECONOMIC FOR A COMPANY', return: result });
};
