import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { secondary_economic_activityProviders } from '../../database/providers/Secondary_economic_activity';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    id: yup.number().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
    idCompany: yup.number().notRequired().moreThan(0),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// QUERRY PARAMETER VALIDATION
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
}));

// GET ALL COLABORATORS
export const getAll = async (req: Request<{}, {}, {}, typeQueryProps>, res: Response) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const filter = req.query.filter;
    const idCompany = req.query.idCompany;

    // Function get all colaborator
    let result;
    if (idCompany === undefined) {
        result = await secondary_economic_activityProviders.getAll(
            Number(page) || 1,
            Number(limit) || 10,
            filter || '',
            Number(req.headers.IdUser),
        );
    } else {
        result = await secondary_economic_activityProviders.getAllByCompany(
            Number(page) || 1,
            Number(limit) || 10,
            filter || '',
            Number(req.headers.IdUser),
            Number(idCompany),
        );
    }

    // Count all collaborators
    const count = await secondary_economic_activityProviders.count(
        filter || '',
        Number(req.headers.IdUser),
    );

    // Verify instance of Error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    } else if (count instanceof Error) {
        return res.status(500).json({
            errors: {
                default: count.message,
            },
        });
    }

    // Set total colaborators on table
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(200).json({ result: result });
};
