import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { addressProviders } from '../../database/providers/Address';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    id: yup.number().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
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

    // Function get all colaborator
    const result = await addressProviders.getAll(
        Number(page) || 1,
        Number(limit) || 10,
        filter || '',
        Number(req.headers.IdUser),
    );
    // Count all collaborators
    const count = await addressProviders.count(filter || '', Number(req.headers.IdUser));

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
