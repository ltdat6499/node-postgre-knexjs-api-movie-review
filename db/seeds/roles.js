"use strict";
const _ = require("../../configs/config");
const knex = require("../../knexfile");
require("dotenv").config();

exports.seed = (knex) => {
    return knex("roles")
        .del()
        .then(() => {
            return knex("roles").insert([
                {
                    id: 1,
                    user_id: "1",
                    role: "author read",
                },
                {
                    id: 2,
                    user_id: "1",
                    role: "author write",
                },
            ]);
        });
};
