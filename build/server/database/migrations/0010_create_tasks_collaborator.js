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
            .createTable(ETablesNames_1.EnumTableNames.tasks_collaborators, (table) => {
            table.increments('id').unsigned().primary().index();
            table.integer('id_task').unsigned().notNullable();
            table.integer('id_collaborator').unsigned().notNullable();
            table.foreign('id_task').references('tasks.id').onDelete('CASCADE').onUpdate('CASCADE');
            table
                .foreign('id_collaborator')
                .references('collaborators.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamps(true, true);
            table.comment('Table for config tasks_collaborators');
        })
            .then(() => {
            console.log(`# Create table ${ETablesNames_1.EnumTableNames.tasks_collaborators}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTable(ETablesNames_1.EnumTableNames.tasks_collaborators)
            .then(() => console.log(`# Dropped table ${ETablesNames_1.EnumTableNames.tasks_collaborators}`));
    });
}
exports.down = down;
