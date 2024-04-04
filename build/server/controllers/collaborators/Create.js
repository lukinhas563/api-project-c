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
const Collaborators_1 = require("../../database/providers/Collaborators");
const yup = __importStar(require("yup"));
// BODY VALIDATION
exports.createValidation = (0, middlewares_1.validation)((getSchema) => ({
    body: getSchema(yup.object({
        first_name: yup.string().required().min(3).max(150),
        last_name: yup.string().optional().min(3).max(150),
        email: yup.string().optional().email().min(5),
    })),
}));
// CREATE A COLLABORATOR
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Call the provider
    const result = yield Collaborators_1.collaboratorsProviders.create(Object.assign(Object.assign({}, req.body), { id_user: Number(req.headers.IdUser) }));
    // Verify instance of error
    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res
        .status(201)
        .json({ result: 'CREATED A COLABORATOR NEW COLLABORATOR', return: result });
});
exports.create = create;
