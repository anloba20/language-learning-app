import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('vocabulary', (table) => {
        table.bigIncrements('id');
        table.text('topic_slug').notNullable();
        table.enum('part_of_speech', ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection']).notNullable();
        table.integer('level').notNullable().defaultTo(1);
        table.jsonb('translations').notNullable();
        table.jsonb('meta').nullable();
        table.timestamps(true, true);
        table.index(['topic_slug', 'level'], 'vocabulary_topic_pos_level_index');
        table.index('part_of_speech');
        table.index('level');
    });
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('vocabulary');
}

