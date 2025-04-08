import knex from 'knex';
import condig from "./database/knexfile.js";

const db = knex(config.development);

export default db;