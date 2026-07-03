import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.bigIncrements('id');
        table.text('nickname').notNullable().unique();
        table.text('email').notNullable().unique();
        table.text('password_hash').notNullable();
        table.text('role').notNullable().defaultTo('user').checkIn(['user', 'admin']);
        table.timestamps(true, true);
    }); 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

