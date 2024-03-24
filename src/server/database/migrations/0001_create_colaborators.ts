import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.collaborators, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('photo', 255);
            table.string('first_name', 150).notNullable().checkLength('>=', 3);
            table.string('last_name', 150).checkLength('>=', 3);
            table.string('cpf', 11).checkLength('>', 10);
            table.string('email', 255).checkLength('>', 6);
            table.integer('id_user').unsigned();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config colaborators');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.collaborators}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.collaborators)
        .then(() => console.log(`# Dropped table ${EnumTableNames.collaborators}`));
}
