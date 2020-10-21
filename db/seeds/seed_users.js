'use strict'
const _ = require('../../configs/constrant')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = function (knex) {
  return knex(_.TBL_USERS).del()
    .then(function () {
      return knex(_.TBL_USERS).insert([
        {
          username: 'admin',
          password: '123',
        },
        {
          username: 'user',
          password: '321',
        },
        {
          username: 'manager',
          password: '123',
        },
        {
          username: 'staff',
          password: '321',
        },
        {
          username: 'employee',
          password: '123',
        },
        {
          username: 'saler',
          password: '3211',
        }
      ])
    })
}