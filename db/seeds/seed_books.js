'use strict'
const _ = require('../../configs/config')
const knex = require('../../knexfile');
require('dotenv').config()

exports.seed = (knex) => {
    return knex(_.books.name).del()
        .then(() => {
            return knex(_.books.name).insert([
                { id: 1, name: 'Harry Potter and the Chamber of Secrets', genre: 'fiction', authorid: 1 },
                { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', genre: 'action', authorid: 1 },
                { id: 3, name: 'Harry Potter and the Goblet of Fire', genre: 'action', authorid: 1 },
                { id: 4, name: 'The Fellowship of the Ring', genre: 'action', authorid: 2 },
                { id: 5, name: 'The Two Towers', genre: 'action', authorid: 2 },
                { id: 6, name: 'The Return of the King', genre: 'action', authorid: 2 },
                { id: 7, name: 'The Way of Shadows', genre: 'action', authorid: 3 },
                { id: 8, name: 'Beyond the Shadows', genre: 'action', authorid: 3 }
            ])
        })
}