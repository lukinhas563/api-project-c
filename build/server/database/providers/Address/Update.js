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
exports.update = void 0;
const ETablesNames_1 = require("../../ETablesNames");
const knex_1 = require("../../knex");
const update = (address, id, idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.address)
            .where('id', '=', id)
            .andWhere('id_user', '=', idUser)
            .update(address);
        if (result > 0)
            return;
        return new Error('Erro ao atualizar o registro.');
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro.');
    }
});
exports.update = update;
