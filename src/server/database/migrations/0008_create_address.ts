import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.address, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('street', 150).notNullable().checkLength('>=', 3);
            table.string('number', 150).notNullable();
            table.string('complement', 150).checkLength('>=', 3);
            table.string('city', 150).notNullable().checkLength('>=', 3);
            table.string('state', 150).notNullable();
            table.string('zip_code', 150).notNullable().checkLength('>=', 3);

            table.integer('id_user').unsigned();
            table.integer('id_company').unsigned().unique();
            table.integer('id_partner').unsigned().unique();
            table.integer('id_employee').unsigned().unique();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
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
            table
                .foreign('id_employee')
                .references('employees.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config address');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.address}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.address)
        .then(() => console.log(`# Dropped table ${EnumTableNames.address}`));
}
