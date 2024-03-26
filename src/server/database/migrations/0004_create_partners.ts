import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.partners, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('first_name', 150).notNullable().checkLength('>=', 3);
            table.string('last_name', 150).checkLength('>=', 3);
            table.string('cpf', 20).notNullable().unique().checkLength('>=', 11);
            table.string('email', 255).checkLength('>=', 3);
            table.integer('percentage').unsigned().notNullable();
            table.integer('id_user').unsigned();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config Partners');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.partners}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.partners)
        .then(() => console.log(`# Dropped table ${EnumTableNames.partners}`));
}
