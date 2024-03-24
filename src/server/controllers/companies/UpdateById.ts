import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeCompany } from '../../database/models';
import { companiesProviders } from '../../database/providers/Companies';

import * as yup from 'yup';

//  TYPE PARAMS
type typeParamsProps = {
    id?: number;
};

type typeBodyProps = Partial<Omit<typeCompany, 'id' | 'id_user'>>;

// TYPE QUERRY
type typeQuerryProps = {
    idCollaborator?: number;
};

// PARAMS AND BODY VALIDATION
export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(
        yup.object({
            id: yup.number().integer().optional().moreThan(0),
            idCollaborator: yup.number().integer().optional().moreThan(0),
        }),
    ),
    query: getSchema<typeQuerryProps>(
        yup.object({
            idCollaborator: yup.number().optional().moreThan(0),
        }),
    ),
    body: getSchema<typeBodyProps>(
        yup.object({
            company_name: yup.string().optional().min(3).max(150),
            fantasy_name: yup.string().optional().min(3).max(150),
            cnpj: yup.string().optional().min(11).max(20),
            email: yup.string().email().optional().min(3).max(255),
            size: yup.string().optional().min(2).max(150),
            tax_regime: yup.string().optional().min(3).max(150),
            status: yup.string().optional().min(3).max(150),
            opening_date: yup.string().optional().min(3).max(150),
            main_economic_activity: yup.string().optional().min(3).max(150),
            id_collaborator: yup.number().optional().moreThan(0),
        }),
    ),
}));

// UPDATE INFOS OF A COLLABORATORS
export const updateById = async (
    req: Request<typeParamsProps, {}, typeBodyProps, typeQuerryProps>,
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

    if (!req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCollaborator" precisa ser informado.',
            },
        });
    }

    const result = await companiesProviders.update(
        req.body,
        Number(req.params.id),
        Number(req.headers.IdUser),
        Number(req.query.idCollaborator),
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
