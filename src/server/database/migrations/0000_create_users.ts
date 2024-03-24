import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.users, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('user_name', 150).notNullable().unique().checkLength('>', 6);
            table.string('first_name', 150).notNullable().checkLength('>=', 3);
            table.string('last_name', 150).checkLength('>=', 3);
            table.string('cpf', 11).notNullable().unique().checkLength('>', 10);
            table.string('email', 255).notNullable().unique().checkLength('>', 6);
            table.string('password_hash', 255).notNullable().unique().checkLength('>', 6);
            table.timestamps(true, true);

            table.comment('Table for config users');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.users}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.users)
        .then(() => console.log(`# Dropped table ${EnumTableNames.users}`));
}
