import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.companies_employees, (table) => {
            table.increments('id').unsigned().primary().index();
            table.integer('id_company').unsigned().notNullable();
            table.integer('id_employee').unsigned().notNullable();

            table
                .foreign('id_company')
                .references('companies.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table
                .foreign('id_employee')
                .references('employees.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config companies_employees');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.companies_employees}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.companies_employees)
        .then(() => console.log(`# Dropped table ${EnumTableNames.companies_employees}`));
}
