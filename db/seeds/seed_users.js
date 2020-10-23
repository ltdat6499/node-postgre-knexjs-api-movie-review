'use strict'
const _ = require('../../configs/config')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = (knex) => {
  return knex(_.users.name).del()
    .then(function () {
      return knex(_.users.name).insert([
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
          username: 'seller',
          password: '3211',
        }
      ])
    })
}