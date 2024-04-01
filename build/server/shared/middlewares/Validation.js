"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (getAllSchemas) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult = {};
    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            // VALIDATE SCHEMAS
            schema.validateSync(req[key], {
                abortEarly: false,
            });
        }
        catch (err) {
            const yupError = err;
            const validationErrors = {};
            // ERRORS MESSAGES
            yupError.inner.forEach((error) => {
                if (!error.path)
                    return;
                validationErrors[error.path] = error.message;
            });
            errorsResult[key] = validationErrors;
        }
    });
    if (Object.entries(errorsResult).length === 0) {
        return next();
    }
    else {
        return res.status(400).json({ errors: errorsResult });
    }
});
exports.validation = validation;
