import knex from "knex";
import 'dotenv/config';

export const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

