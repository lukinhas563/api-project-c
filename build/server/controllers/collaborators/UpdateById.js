"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateById = exports.updateByIdValidation = void 0;
const middlewares_1 = require("../../shared/middlewares");
const Collaborators_1 = require("../../database/providers/Collaborators");
const yup = __importStar(require("yup"));
// PARAMS AND BODY VALIDATION
exports.updateByIdValidation = (0, middlewares_1.validation)((getSchema) => ({
    params: getSchema(yup.object({
        id: yup.number().integer().optional().moreThan(0),
    })),
    body: getSchema(yup.object({
        photo: yup.string().optional(),
        first_name: yup.string().optional().min(3),
        last_name: yup.string().optional().min(3),
        cpf: yup.string().optional().min(11),
        email: yup.string().email().optional(),
    })),
}));
// UPDATE INFOS OF A COLLABORATORS
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check there are a body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: {
                default: 'O corpo da requisição não pode estar vazio.',
            },
        });
    }
    // Check there are a id
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }
    const result = yield Collaborators_1.collaboratorsProviders.update(req.body, Number(req.params.id), Number(req.headers.IdUser));
    // Check there are a error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(200).json({ result: 'UPDATED A COLABORATOR' });
});
exports.updateById = updateById;
