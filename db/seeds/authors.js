"use strict";
require("dotenv").config();

exports.seed = (knex) => {
  await knex("authors").del();
  await knex("authors").insert([
    { id: 1, name: "J. K. Rowling", age: 30 },
    { id: 2, name: "J. R. R. Tolkien", age: 40 },
    { id: 3, name: "Brent Weeks", age: 50 },
  ]);
};
