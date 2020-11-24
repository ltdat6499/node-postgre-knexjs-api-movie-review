"use strict";
require("dotenv").config();

exports.seed = (knex) => {
  await knex("books").del()
  await knex("books").insert([
    {
      id: 1,
      name: "Harry Potter and the Chamber of Secrets",
      genre: "fiction",
      author_id: 1,
    },
    {
      id: 2,
      name: "Harry Potter and the Prisoner of Azkaban",
      genre: "action",
      author_id: 1,
    },
    {
      id: 3,
      name: "Harry Potter and the Goblet of Fire",
      genre: "action",
      author_id: 1,
    },
    {
      id: 4,
      name: "The Fellowship of the Ring",
      genre: "action",
      author_id: 2,
    },
    {
      id: 5,
      name: "The Two Towers",
      genre: "action",
      author_id: 2,
    },
    {
      id: 6,
      name: "The Return of the King",
      genre: "action",
      author_id: 2,
    },
    {
      id: 7,
      name: "The Way of Shadows",
      genre: "action",
      author_id: 3,
    },
    {
      id: 8,
      name: "Beyond the Shadows",
      genre: "action",
      author_id: 3,
    },
  ]);
};
