import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.companies, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('company_name', 150).notNullable().checkLength('>=', 3);
            table.string('fantasy_name', 150).notNullable().checkLength('>=', 3);
            table.string('cnpj', 20).notNullable().checkLength('>', 10).unique();
            table.string('email', 255).checkLength('>=', 3);
            table.string('size', 150).notNullable();
            table.string('tax_regime', 150).notNullable().checkLength('>=', 3);
            table.string('status', 150).checkLength('>=', 3);
            table.string('opening_date', 150).notNullable();
            table.string('main_economic_activity', 255).notNullable().checkLength('>=', 3);

            table.integer('id_collaborator').unsigned();
            table.integer('id_user').unsigned();

            table
                .foreign('id_collaborator')
                .references('collaborators.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config companies');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.companies}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.companies)
        .then(() => console.log(`# Dropped table ${EnumTableNames.companies}`));
}
