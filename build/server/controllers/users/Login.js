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
exports.login = exports.loginValidation = void 0;
const middlewares_1 = require("../../shared/middlewares");
const yup = __importStar(require("yup"));
const Users_1 = require("../../database/providers/Users");
const services_1 = require("../../shared/services");
exports.loginValidation = (0, middlewares_1.validation)((getSchema) => ({
    body: getSchema(yup.object({
        user_name: yup.string().required().min(3),
        password_hash: yup.string().required().min(3),
    })),
}));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, password_hash } = req.body;
    const result = yield Users_1.userProviders.getByUsername(user_name);
    if (result instanceof Error) {
        return res.status(401).json({
            errors: {
                default: 'E-mail ou senha inválidos.',
            },
        });
    }
    const passwordMatch = yield services_1.PasswordCrypto.verifyPassword(password_hash, result.password_hash);
    if (!passwordMatch) {
        return res.status(401).json({
            errors: {
                default: 'E-mail ou senha inválidos.',
            },
        });
    }
    else {
        const accessToken = services_1.JWTService.sign({ uid: result.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(500).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso.',
                },
            });
        }
        console.log(result);
        return res.status(200).json({
            id: result.id,
            user_name: result.user_name,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            accessToken: accessToken,
        });
    }
});
exports.login = login;
