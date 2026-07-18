import type { Knex } from "knex";

const game = [
    { slug: 'word-match', category_id: 1, title: 'Word Match', description: 'Match words with their translations.', is_active: true, order: 1 },
]

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('games', (table) => {
        table.bigIncrements('id');
        table.text('slug').notNullable().unique();
        table.bigInteger('category_id').unsigned().notNullable().references('id').inTable('game_categories');
        table.text('title').notNullable().unique();
        table.text('description').notNullable();
        table.boolean('is_active').notNullable().defaultTo(true);
        table.integer('order').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
    await knex('games').insert(game);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('games');
}

