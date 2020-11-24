"use strict";
const knex = require("../../knexfile");
require("dotenv").config();

exports.seed = (knex) => {
  return knex("authors")
    .del()
    .then(() => {
      return knex("authors").insert([
        { id: 1, name: "J. K. Rowling", age: 30 },
        { id: 2, name: "J. R. R. Tolkien", age: 40 },
        { id: 3, name: "Brent Weeks", age: 50 },
      ]);
    });
};
