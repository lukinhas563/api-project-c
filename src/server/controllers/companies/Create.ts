import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeCompany } from '../../database/models';
import { companiesProviders } from '../../database/providers/Companies';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCollaborator: yup.number().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// BODY VALIDATION
type typeBodyColaborator = Omit<typeCompany, 'id' | 'id_user' | 'id_collaborator'>;

export const createValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
    body: getSchema<typeBodyColaborator>(
        yup.object({
            company_name: yup.string().required().min(3).max(150),
            fantasy_name: yup.string().required().min(3).max(150),
            cnpj: yup.string().required().min(11).max(20),
            email: yup.string().email().optional().min(3).max(255),
            size: yup.string().required().min(2).max(150),
            tax_regime: yup.string().required().min(3).max(150),
            status: yup.string().optional().min(3).max(150),
            opening_date: yup.string().required().min(3).max(150),
            main_economic_activity: yup.string().required().min(3).max(150),
        }),
    ),
}));

// CREATE A COMPANY
export const create = async (req: Request<{}, {}, typeCompany, typeQueryProps>, res: Response) => {
    // Check the querry
    if (!req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCollaborator" precisa ser informado.',
            },
        });
    }

    // Call the provider
    const result = await companiesProviders.create({
        ...req.body,
        id_collaborator: Number(req.query.idCollaborator),
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

    return res.status(201).json({ result: 'CREATED A NEW COMPANY', return: result });
};
