"use strict";
const config = require("../../configs/config");
const knex = require("../../knexfile");
require("dotenv").config();

exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          username: "admin",
          role: 1,
          password: "123",
        },
        {
          username: "manager",
          role: 2,
          password: "123",
        },
        {
          username: "employee",
          role: 3,
          password: "123",
        },
        {
          username: "user",
          role: 4,
          password: "321",
        },
      ]);
    });
};
