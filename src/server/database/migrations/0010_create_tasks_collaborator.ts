import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.tasks_collaborators, (table) => {
            table.increments('id').unsigned().primary().index();
            table.integer('id_task').unsigned().notNullable();
            table.integer('id_collaborator').unsigned().notNullable();

            table.foreign('id_task').references('tasks.id').onDelete('CASCADE').onUpdate('CASCADE');

            table
                .foreign('id_collaborator')
                .references('collaborators.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config tasks_collaborators');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.tasks_collaborators}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.tasks_collaborators)
        .then(() => console.log(`# Dropped table ${EnumTableNames.tasks_collaborators}`));
}
