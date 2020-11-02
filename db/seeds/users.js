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
          password: "123",
        },
        {
          username: "manager",
          password: "123",
        },
        {
          username: "employee",
          password: "123",
        },
        {
          username: "user",
          password: "321",
        },
      ]);
    });
};
