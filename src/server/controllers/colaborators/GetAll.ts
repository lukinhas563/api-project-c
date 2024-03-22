import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { colaboratorsProviders } from '../../database/providers/Colaborators';

const queryPropSchema = yup.object({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
}));

export const getAll = async (req: Request<{}, {}, {}, typeQueryProps>, res: Response) => {
    console.log(req.query);
    const page = req.query.page;
    const limit = req.query.limit;
    const filter = req.query.filter;

    if (!page || !limit || !filter) return;

    const result = await colaboratorsProviders.getAll(page, limit, filter);

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(200).json({ result: result });
};
