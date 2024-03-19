import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';

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

    return res.status(500).json({ result: 'GET A COLABORATOR NOT IMPLEMENTED' });
};
