import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.users, (table) => {
            table.bigIncrements('id').primary();
            table.string('user_name', 150).notNullable().unique();
            table.string('first_name', 150).notNullable();
            table.string('last_name', 150);
            table.string('cpf', 11).notNullable().unique();
            table.string('email', 255).notNullable().unique();
            table.string('password_hash', 255).notNullable().unique();

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
