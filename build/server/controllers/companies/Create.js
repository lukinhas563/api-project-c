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
exports.create = exports.createValidation = void 0;
const middlewares_1 = require("../../shared/middlewares");
const Companies_1 = require("../../database/providers/Companies");
const yup = __importStar(require("yup"));
// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCollaborator: yup.number().notRequired(),
});
exports.createValidation = (0, middlewares_1.validation)((getSchema) => ({
    query: getSchema(queryPropSchema),
    body: getSchema(yup.object({
        company_name: yup.string().required().min(3).max(150),
        fantasy_name: yup.string().required().min(3).max(150),
        cnpj: yup.string().required().min(11).max(20),
        email: yup.string().email().optional().min(3).max(255),
        size: yup.string().required().min(2).max(150),
        tax_regime: yup.string().required().min(3).max(150),
        status: yup.string().optional().min(3).max(150),
        opening_date: yup.string().required().min(3).max(150),
        main_economic_activity: yup.string().required().min(3).max(150),
    })),
}));
// CREATE A COMPANY
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check the querry
    if (!req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCollaborator" precisa ser informado.',
            },
        });
    }
    // Call the provider
    const result = yield Companies_1.companiesProviders.create(Object.assign(Object.assign({}, req.body), { id_collaborator: Number(req.query.idCollaborator), id_user: Number(req.headers.IdUser) }));
    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(201).json({ result: 'CREATED A NEW COMPANY', return: result });
});
exports.create = create;
