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
exports.down = exports.up = void 0;
const ETablesNames_1 = require("../ETablesNames");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable(ETablesNames_1.EnumTableNames.companies_partners, (table) => {
            table.increments('id').unsigned().primary().index();
            table.integer('id_company').unsigned().notNullable();
            table.integer('id_partner').unsigned().notNullable();
            table
                .foreign('id_company')
                .references('companies.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .foreign('id_partner')
                .references('partners.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps(true, true);
            table.comment('Table for config companies_partners');
        })
            .then(() => {
            console.log(`# Create table ${ETablesNames_1.EnumTableNames.companies_partners}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTable(ETablesNames_1.EnumTableNames.companies_partners)
            .then(() => console.log(`# Dropped table ${ETablesNames_1.EnumTableNames.companies_partners}`));
    });
}
exports.down = down;
