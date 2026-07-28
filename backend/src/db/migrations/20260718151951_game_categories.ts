import type { Knex } from "knex";

const gameCategories = [
    {slug: 'vocabulary', title: 'Vocabulary'},
    {slug: 'listening', title: 'Listening'},
    {slug: 'spelling', title: 'Spelling'},
    {slug: 'grammar', title: 'Grammar'},
];

export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable('game_categories', (table) => {
        table.bigIncrements('id');
        table.text('slug').notNullable().unique();
        table.text('title').notNullable().unique();
        table.integer('order').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
    await knex('game_categories').insert(gameCategories);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('game_categories');
}

