import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { typeTasks } from '../../database/models';
import { tasksProviders } from '../../database/providers/Tasks';

import * as yup from 'yup';

// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCollaborator: yup.number().notRequired(),
});

type typeQueryProps = yup.InferType<typeof queryPropSchema>;

// BODY VALIDATION
type typeBodyColaborator = Omit<typeTasks, 'id' | 'id_user'>;

export const createValidation = validation((getSchema) => ({
    query: getSchema<typeQueryProps>(queryPropSchema),
    body: getSchema<typeBodyColaborator>(
        yup.object({
            title: yup.string().required().min(3).max(150),
            description: yup.string().optional().min(3).max(255),
            status: yup.string().optional().min(3).max(150),
            priority: yup.string().optional().min(3).max(150),
            file: yup.string().optional().min(2).max(255),
        }),
    ),
}));

// CREATE A COMPANY
export const create = async (req: Request<{}, {}, typeTasks, typeQueryProps>, res: Response) => {
    if (!req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCollaborator" precisa ser informado.',
            },
        });
    }

    // Call the provider
    const result = await tasksProviders.create(
        {
            ...req.body,
            id_user: Number(req.headers.IdUser),
        },
        Number(req.query.idCollaborator),
    );

    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(201).json({ result: 'CREATED A NEW TASK', return: result });
};
