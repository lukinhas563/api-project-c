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
exports.getAll = void 0;
const ETablesNames_1 = require("../../ETablesNames");
const knex_1 = require("../../knex");
const getAll = (page_1, limit_1, filter_1, IdUser_1, ...args_1) => __awaiter(void 0, [page_1, limit_1, filter_1, IdUser_1, ...args_1], void 0, function* (page, limit, filter, IdUser, id = 0) {
    try {
        const result = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.tasks)
            .select('*')
            .where('id', id)
            .orWhere('title', 'like', `%${filter}%`)
            .andWhere('id_user', IdUser)
            .offset((page - 1) * limit)
            .limit(limit);
        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.tasks)
                .select('*')
                .where('id', '=', id)
                .first();
            if (resultById)
                return [...result, resultById];
        }
        return result;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao localizar os registros.');
    }
});
exports.getAll = getAll;
