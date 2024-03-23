import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { colaboratorsProviders } from '../../database/providers/Colaborators';
import { typeColaborator } from '../../database/models';
import * as yup from 'yup';

const paramsPropSchema = yup.object({
    id: yup.number().integer().optional().moreThan(0),
});

type typeParamsProps = yup.InferType<typeof paramsPropSchema>;

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<typeParamsProps>(paramsPropSchema),
}));

export const getById = async (req: Request<typeParamsProps>, res: Response) => {
    if (!req.params.id)
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });

    const result = await colaboratorsProviders.getById(req.params.id, Number(req.headers.IdUser));

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(200).json({ result: result });
};
