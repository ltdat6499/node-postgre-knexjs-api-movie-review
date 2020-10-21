'use strict'

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('todos').del()
      .then(function () {
        // Inserts seed entries
        return knex('todos').insert([
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