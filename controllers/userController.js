import knex from 'knex';
import config from '../database/knexfile.js';
import bcrypt from 'bcrypt';

const db = knex(config.development);


