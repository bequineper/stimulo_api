import knex from 'knex';
import config from "./database/knexfile.js";

const db = knex(config.development);

export default db;