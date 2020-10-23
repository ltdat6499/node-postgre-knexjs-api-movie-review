'use strict'
const _ = require('../../configs/config')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = function (knex) {
  return knex(_.todo.name).del()
    .then(function () {
      return knex(_.todo.name).insert([
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
          message: 'stop the damn deflowers outside',
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