'use strict'
const _ = require('../../configs/config')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = (knex) => {
    return knex(_.books.name).del()
        .then(() => {
            return knex(_.books.name).insert([
                {
                    name: 'go to store for milk1',
                    genre: 'mis',
                    info: 'go to store for milk',
                },
                {
                    name: 'go to store for milk2',
                    genre: 'act',
                    info: 'go to store for milk',
                },
                {
                    name: 'go to store for milk3',
                    genre: 'sic',
                    info: 'go to store for milk',
                },
                {
                    name: 'go to store for milk4',
                    genre: 'tec',
                    info: 'go to store for milk',
                },
                {
                    name: 'go to store for milk5',
                    genre: 'mus',
                    info: 'go to store for milk',
                },
                {
                    name: 'go to store for milk6',
                    genre: 'hor',
                    info: 'go to store for milk',
                },
            ])
        })
}