import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.colaborators, (table) => {
            table.increments('id').unsigned().primary();
            table.string('photo', 255);
            table.string('first_name', 150).notNullable();
            table.string('last_name', 150);
            table.string('cpf', 11);
            table.string('email', 255);
            table.integer('id_user').unsigned();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config colaborators');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.colaborators}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.users)
        .then(() => console.log(`# Dropped table ${EnumTableNames.colaborators}`));
}
