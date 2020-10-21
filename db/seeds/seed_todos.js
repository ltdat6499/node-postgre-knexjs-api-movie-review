'use strict'
const _ = require('../../configs/constrant')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = function (knex) {
  return knex(_.TBL_TODOS).del()
    .then(function () {
      return knex(_.TBL_TODOS).insert([
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