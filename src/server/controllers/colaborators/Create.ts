import { Request, Response } from 'express';
import * as yup from 'yup';

const colaboratorSchema = yup.object({
    first_name: yup.string().required().min(3),
    last_name: yup.string().required().min(3),
});

type IColaborator = yup.InferType<typeof colaboratorSchema>;

export const create = async (
    req: Request<{}, {}, IColaborator>,
    res: Response,
) => {
    let validateData: IColaborator | undefined = undefined;

    try {
        validateData = await colaboratorSchema.validate(req.body, {
            abortEarly: false,
        });

        return res.json({ result: 'CREATE A COLABORATOR', body: req.body });
    } catch (err) {
        const yupError = err as yup.ValidationError;

        const validationErrors: Record<string, string> = {};
        yupError.inner.forEach((error) => {
            if (!error.path) return;

            validationErrors[error.path] = error.message;
        });

        return res.status(400).json({ errors: validationErrors });
    }
};
