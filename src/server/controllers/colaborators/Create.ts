import { Request, Response } from 'express';
import * as yup from 'yup';

const colaboratorSchema = yup.object({
    name: yup.string().required().min(3),
});

type IColaborator = yup.InferType<typeof colaboratorSchema>;

export const create = async (
    req: Request<{}, {}, IColaborator>,
    res: Response,
) => {
    let validateData: IColaborator | undefined = undefined;

    try {
        validateData = await colaboratorSchema.validate(req.body);

        return res.json({ result: 'CREATE A COLABORATOR', body: req.body });
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.status(400).json({
            errors: {
                default: yupError.message,
            },
        });
    }
};
