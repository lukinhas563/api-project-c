import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeRegistrations } from '../../database/models';
import { registrationsProviders } from '../../database/providers/registrations';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCompany: yup.number().notRequired(),
    idCollaborator: yup.number().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// BODY VALIDATION
type typeBodyColaborator = Omit<
    typeRegistrations,
    'id' | 'id_user' | 'id_company' | 'id_collaborator' | 'number_record'
>;

export const createValidation = validation((getSchema) => ({
    body: getSchema<typeBodyColaborator>(
        yup.object({
            type_record: yup.string().optional().min(3),
            value: yup.number().optional().moreThan(0),
        }),
    ),
}));

// CREATE A COLLABORATOR
export const create = async (
    req: Request<{}, {}, typeRegistrations, typeQueryProps>,
    res: Response,
) => {
    // Check the querry
    if (!req.query.idCompany && !req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCompany" e "idCollaborator" precisa ser informado.',
            },
        });
    }

    const newData = Date.now();

    // Call the provider
    const result = await registrationsProviders.create({
        ...req.body,
        number_record: `${newData}`,
        id_user: Number(req.headers.IdUser),
        id_company: Number(req.query.idCompany),
        id_collaborator: Number(req.query.idCollaborator),
    });

    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'CREATED A NEW REGISTER FOR A COMPANY', return: result });
};
