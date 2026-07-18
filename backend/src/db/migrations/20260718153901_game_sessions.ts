import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('game_sessions', (table) => {
        table.bigIncrements('id');
        table.bigInteger('game_id').unsigned().notNullable().references('id').inTable('games');
        table.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('score').notNullable().defaultTo(0);
        table.integer('duration_seconds').notNullable().defaultTo(0);
        table.bigInteger('native_language_id').unsigned().notNullable().references('id').inTable('languages');
        table.bigInteger('foreign_language_id').unsigned().notNullable().references('id').inTable('languages');
        table.boolean('is_completed').notNullable().defaultTo(false);
        table.timestamp('completed_at').nullable().defaultTo(null);
        table.timestamp('started_at').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('game_sessions');
}

