'use strict';

exports.up = async (knex) => {
    // return knex.schema.createTable('todos', (table) => {
    //     table.increments('id').identity('id').notNullable()
    //     table.string('message').notNullable()
    //     table.boolean('status').notNullable().defaultTo(false)
    // })
    await knex.raw(`
            CREATE TABLE todos (
            id serial PRIMARY KEY,
            message VARCHAR ( 100 ) NOT NULL,
            status Boolean NOT NULL DEFAULT FALSE
        )`
    )
    await knex.raw(`
        ALTER TABLE "todos" ADD COLUMN created_at varchar(255) 
    `)
}

exports.down = async  (knex) => {
    // return knex.schema.dropTable('todos')
    await knex.raw(`
        DROP TABLE todos
    `)
}
