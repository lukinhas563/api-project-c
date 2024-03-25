import type { Knex } from 'knex';
import { EnumTableNames } from '../ETablesNames';

export async function up(knex: Knex) {
    return knex.schema
        .createTable(EnumTableNames.secondary_economic_activity, (table) => {
            table.increments('id').unsigned().primary().index();
            table.string('code', 150).notNullable().checkLength('>=', 3);
            table.string('activity', 150).notNullable().checkLength('>=', 3);

            table.integer('id_company').unsigned();
            table
                .foreign('id_company')
                .references('companies.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.timestamps(true, true);

            table.comment('Table for config secondary economic activity');
        })
        .then(() => {
            console.log(`# Create table ${EnumTableNames.secondary_economic_activity}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .dropTable(EnumTableNames.secondary_economic_activity)
        .then(() => console.log(`# Dropped table ${EnumTableNames.secondary_economic_activity}`));
}
