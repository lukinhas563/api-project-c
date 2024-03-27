import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.tasks, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('title', 150).notNullable().checkLength('>=', 3);
            table.string('description', 255).checkLength('>=', 3);
            table.string('status', 150).checkLength('>=', 3);
            table.string('priority', 150).checkLength('>=', 3);
            table.string('file', 255).checkLength('>=', 3);
            table.integer('id_user').unsigned();

            table.foreign('id_user').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config tasks');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.tasks}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.tasks)
        .then(() => console.log(`# Dropped table ${EnumTableNames.tasks}`));
}
