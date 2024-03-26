import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeAddress } from '../../database/models';
import { addressProviders } from '../../database/providers/Address';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCompany: yup.number().notRequired(),
    idPartner: yup.number().notRequired(),
    idEmployee: yup.number().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// BODY VALIDATION
type typeBodyColaborator = Omit<
    typeAddress,
    'id' | 'id_user' | 'id_company' | 'id_partner' | 'id_employee'
>;

// BODY VALIDATION
export const createValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
    body: getSchema<typeBodyColaborator>(
        yup.object({
            street: yup.string().required().min(5),
            number: yup.string().required(),
            complement: yup.string().optional().min(3),
            city: yup.string().required().min(3),
            state: yup.string().required(),
            zip_code: yup.string().required().min(5),
        }),
    ),
}));

// CREATE A COLLABORATOR
export const create = async (req: Request<{}, {}, typeAddress, typeQueryProps>, res: Response) => {
    // Check the querrys
    if (!req.query.idCompany && !req.query.idPartner && !req.query.idEmployee) {
        return res.status(400).json({
            errors: {
                default: `O parâmetro "idUser", "idCompany", "idPartner" ou "idEmployee" precisa ser informado. `,
            },
        });
    }

    let result: number | Error;

    if (req.query.idCompany) {
        result = await addressProviders.create({
            ...req.body,
            id_user: Number(req.headers.IdUser),
            id_company: Number(req.query.idCompany),
        });
    } else if (req.query.idPartner) {
        result = await addressProviders.create({
            ...req.body,
            id_user: Number(req.headers.IdUser),
            id_partner: Number(req.query.idPartner),
        });
    } else {
        result = await addressProviders.create({
            ...req.body,
            id_user: Number(req.headers.IdUser),
            id_employee: Number(req.query.idEmployee),
        });
    }

    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'CREATED A ADDRESS', return: result });
};
