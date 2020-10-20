'use strict'

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('todos').del()
      .then(function () {
        // Inserts seed entries
        return knex('todos').insert([
          { id: 1,
            message: 'go to store for milk',
            status: false,
          },
          { id: 2,
            message: 'walk the dog',
            status: true,
          },
          { id: 3,
            message: 'go to the gym',
            status: false,
          },
          { id: 4,
            message: 'stop the damn leafblowers outside',
            status: true,
          },
          { id: 5,
            message: 'get the mail',
            status: false,
          },
          { id: 6,
            message: 'get some headphones',
            status: true,
          },
        ])
      })
  }