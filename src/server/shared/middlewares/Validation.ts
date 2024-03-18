import { RequestHandler } from 'express';
import { ObjectSchema, ValidationError } from 'yup';

type typeProperty = 'body' | 'header' | 'params' | 'query';
type typeGetSchema = <T extends Record<string, any>>(schema: ObjectSchema<T>) => ObjectSchema<any>;

type typeAllSchemas = Record<typeProperty, ObjectSchema<any>>;
type typGetAllSchemas = (getSchema: typeGetSchema) => Partial<typeAllSchemas>;
type TypeValidation = (getAllSchemas: typGetAllSchemas) => RequestHandler;

export const validation: TypeValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            // VALIDATE SCHEMAS
            schema.validateSync(req[key as typeProperty], {
                abortEarly: false,
            });
        } catch (err) {
            const yupError = err as ValidationError;
            const validationErrors: Record<string, string> = {};

            // ERRORS MESSAGES
            yupError.inner.forEach((error) => {
                if (!error.path) return;

                validationErrors[error.path] = error.message;
            });

            errorsResult[key] = validationErrors;
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(400).json({ errors: errorsResult });
    }
};
