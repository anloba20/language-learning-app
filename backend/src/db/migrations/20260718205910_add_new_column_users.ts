import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.integer('native_language_id').nullable().references('id').inTable('languages');
        table.integer('foreign_language_id').nullable().references('id').inTable('languages');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('native_language_id');
        table.dropColumn('foreign_language_id');
    });
}

