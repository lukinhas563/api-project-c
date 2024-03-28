import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.registrations, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('number_record', 150).notNullable().checkLength('>=', 3);
            table.string('type_record', 150).checkLength('>=', 3);
            table.integer('value', 150);
            table.integer('id_user').unsigned();
            table.integer('id_company').unsigned();
            table.integer('id_collaborator').unsigned();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
            table
                .foreign('id_company')
                .references('companies.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .foreign('id_collaborator')
                .references('collaborators.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config registrations');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.registrations}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.registrations)
        .then(() => console.log(`# Dropped table ${EnumTableNames.registrations}`));
}
