import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { colaboratorsProviders } from '../../database/providers/Colaborators';

const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
}));

export const deleteById = async (req: Request<typeParamsProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await colaboratorsProviders.deleteById(Number(req.params.id));

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'DELETED A COLABORATOR.', id: result });
};
