'use strict';
const knex = require('../../knexfile');

exports.up = (knex, Promise) => {
    return knex.schema.createTable('todos', function(table) {
        table.increments('id')
        table.string('message').notNullable()
        table.boolean('status').notNullable().defaultTo(false)
      })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos')
}
