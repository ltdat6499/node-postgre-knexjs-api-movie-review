'use strict'
const knex = require('../../knexfile');
require('dotenv').config()

const { POSTGRES_TABLE } = process.env
exports.seed = function (knex, Promise) {
  return knex(POSTGRES_TABLE).del()
    .then(function () {
      return knex(POSTGRES_TABLE).insert([
        {
          message: 'go to store for milk',
          status: false,
        },
        {
          message: 'walk the dog',
          status: true,
        },
        {
          message: 'go to the gym',
          status: false,
        },
        {
          message: 'stop the damn leafblowers outside',
          status: true,
        },
        {
          message: 'get the mail',
          status: false,
        },
        {
          message: 'get some headphones',
          status: true,
        },
      ])
    })
}