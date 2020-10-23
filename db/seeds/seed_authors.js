'use strict'
const _ = require('../../configs/config')
const knex = require('../../knexfile')
require('dotenv').config()

exports.seed = (knex) => {
    return knex(_.authors.name).del()
        .then(() => {
            return knex(_.authors.name).insert([
                {
                    name: 'Nam1',
                    age: 32,

                },
                {
                    name: 'Nam2',
                    age: 31,

                },
                {
                    name: 'Nam3',
                    age: 12,

                },
                {
                    name: 'Nam4',
                    age: 22,

                },
                {
                    name: 'Nam5',
                    age: 5,

                },
                {
                    name: 'Nam6',
                    age: 14,

                },
            ])
        })
}