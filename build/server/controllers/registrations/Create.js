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
const registrations_1 = require("../../database/providers/registrations");
const yup = __importStar(require("yup"));
// VALIDADE QUERY
const queryPropSchema = yup.object({
    idCompany: yup.number().notRequired(),
    idCollaborator: yup.number().notRequired(),
});
exports.createValidation = (0, middlewares_1.validation)((getSchema) => ({
    body: getSchema(yup.object({
        type_record: yup.string().optional().min(3),
        value: yup.number().optional().moreThan(0),
    })),
}));
// CREATE A COLLABORATOR
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check the querry
    if (!req.query.idCompany && !req.query.idCollaborator) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "idCompany" e "idCollaborator" precisa ser informado.',
            },
        });
    }
    const newData = Date.now();
    // Call the provider
    const result = yield registrations_1.registrationsProviders.create(Object.assign(Object.assign({}, req.body), { number_record: `${newData}`, id_user: Number(req.headers.IdUser), id_company: Number(req.query.idCompany), id_collaborator: Number(req.query.idCollaborator) }));
    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(201).json({ result: 'CREATED A NEW REGISTER FOR A COMPANY', return: result });
});
exports.create = create;
