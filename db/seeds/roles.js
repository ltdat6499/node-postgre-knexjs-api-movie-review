"use strict";
require("dotenv").config();

exports.seed = (knex) => {
  return knex("roles")
    .del()
    .then(() => {
      return knex("roles").insert([
        {
          id: 1,
          user_id: "1",
          role: "author_read",
        },
        {
          id: 2,
          user_id: "1",
          role: "author_write",
        },
        {
          id: 3,
          user_id: "1",
          role: "book_write",
        },
        {
          id: 4,
          user_id: "1",
          role: "book_read",
        },
        {
          id: 5,
          user_id: "4",
          role: "book_read",
        },
      ]);
    });
};
