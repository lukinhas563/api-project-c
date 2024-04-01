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
const services_1 = require("../../../shared/services");
const ETablesNames_1 = require("../../ETablesNames");
const knex_1 = require("../../knex");
const getAll = (page_1, limit_1, filter_1, IdUser_1, idCollaborator_1, ...args_1) => __awaiter(void 0, [page_1, limit_1, filter_1, IdUser_1, idCollaborator_1, ...args_1], void 0, function* (page, limit, filter, IdUser, idCollaborator, id = 0) {
    try {
        const result = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.companies)
            .select('companies.*', 'secondary_economic_activity.id as economic_id', // Activities
        'secondary_economic_activity.code', 'secondary_economic_activity.activity', 'secondary_economic_activity.id_company', 'secondary_economic_activity.created_at as economic_created_at', 'secondary_economic_activity.updated_at as economic_updated_at', 'partners.id as partner_id', // Partners
        'partners.first_name', 'partners.last_name', 'partners.cpf', 'partners.email', 'partners.percentage', 'partners.created_at as partner_created_at', 'partners.updated_at as partner_updated_at', 'employees.id as employe_id', // Employees
        'employees.first_name as employee_first_name', 'employees.last_name as employee_last_name', 'employees.cpf as employee_cpf', 'employees.email as employee_email', 'employees.role as employee_role', 'employees.workload as employee_workload', 'employees.created_at as employee_created_at', 'employees.updated_at as employee_updated_at', 'address.id as address_id', // Address
        'address.street', 'address.number', 'address.complement', 'address.city', 'address.state', 'address.zip_code', 'address.created_at as address_created_at', 'address.updated_at as address_updated_at')
            .leftJoin(ETablesNames_1.EnumTableNames.secondary_economic_activity, 'companies.id', 'secondary_economic_activity.id_company')
            .leftJoin(ETablesNames_1.EnumTableNames.companies_partners, 'companies.id', 'companies_partners.id_company')
            .leftJoin(ETablesNames_1.EnumTableNames.partners, 'partners.id', 'companies_partners.id_partner')
            .leftJoin(ETablesNames_1.EnumTableNames.companies_employees, 'companies.id', 'companies_employees.id_company')
            .leftJoin(ETablesNames_1.EnumTableNames.employees, 'employees.id', 'companies_employees.id_employee')
            .leftJoin(ETablesNames_1.EnumTableNames.address, 'companies.id', 'address.id_company')
            .where('companies.id', id)
            .orWhere('companies.company_name', 'like', `%${filter}%`)
            .andWhere('companies.id_user', IdUser)
            .andWhere('companies.id_collaborator', idCollaborator)
            .offset((page - 1) * limit)
            .limit(limit);
        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = yield (0, knex_1.Knex)(ETablesNames_1.EnumTableNames.companies)
                .select('*')
                .where('id', '=', id)
                .first();
            if (resultById)
                return [...result, resultById];
        }
        const newFormat = (0, services_1.formattedResult)(result);
        return newFormat;
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao localizar os registros.');
    }
});
exports.getAll = getAll;
