import type { Knex } from "knex";

const languages = [
    { name: 'English', code: 'en' },
    { name: 'Russian', code: 'ru' },
    { name: 'Estonian', code: 'et' },
    { name: 'German', code: 'de' },
    { name: 'Norwegian', code: 'no' },
];

export async function up(knex: Knex): Promise<void> {
     await knex.schema.createTable('languages', (table) => {
        table.bigIncrements('id');
        table.text('name').notNullable().unique();
        table.text('code').notNullable().unique();
        table.timestamps(true, true);
    });

    await knex('languages').insert(languages);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('languages');
}

