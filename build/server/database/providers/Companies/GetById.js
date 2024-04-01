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
exports.getById = void 0;
const services_1 = require("../../../shared/services");
const ETablesNames_1 = require("../../ETablesNames");
const knex_1 = require("../../knex");
const getById = (idCompany, idUser, idCollaborator) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.companies)
            .select('companies.*', 'secondary_economic_activity.id as economic_id', 'secondary_economic_activity.code', 'secondary_economic_activity.activity', 'secondary_economic_activity.id_company', 'secondary_economic_activity.created_at as economic_created_at', 'secondary_economic_activity.updated_at as economic_updated_at', 'partners.id as partner_id', 'partners.first_name', 'partners.last_name', 'partners.cpf', 'partners.email', 'partners.percentage', 'partners.created_at as partner_created_at', 'partners.updated_at as partner_updated_at', 'address.id as address_id', // Address
        'address.street', 'address.number', 'address.complement', 'address.city', 'address.state', 'address.zip_code', 'address.created_at as address_created_at', 'address.updated_at as address_updated_at')
            .leftJoin(ETablesNames_1.EnumTableNames.secondary_economic_activity, 'companies.id', 'secondary_economic_activity.id_company')
            .leftJoin(ETablesNames_1.EnumTableNames.companies_partners, 'companies.id', 'companies_partners.id_company')
            .leftJoin(ETablesNames_1.EnumTableNames.partners, 'partners.id', 'companies_partners.id_partner')
            .leftJoin(ETablesNames_1.EnumTableNames.address, 'companies.id', 'address.id_company')
            .where('companies.id', '=', idCompany)
            .andWhere('companies.id_user', '=', idUser)
            .andWhere('companies.id_collaborator', '=', idCollaborator);
        const newFormat = (0, services_1.formattedResult)(result);
        if (result.length > 0)
            return newFormat[0];
        return new Error('Registro não encontrado.');
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao localizar o registro.');
    }
});
exports.getById = getById;
