import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { colaboratorsProviders } from '../../database/providers/Colaborators';
import * as yup from 'yup';

const queryPropSchema = yup.object({
    id: yup.number().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
}));

export const getAll = async (req: Request<{}, {}, {}, typeQueryProps>, res: Response) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const filter = req.query.filter;

    const result = await colaboratorsProviders.getAll(
        Number(page) || 1,
        Number(limit) || 10,
        filter || '',
    );
    const count = await colaboratorsProviders.count(filter || '');

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

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(200).json({ result: result });
};
