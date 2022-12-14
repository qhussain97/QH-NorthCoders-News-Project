const { Pool } = require('pg');

const env = process.env.NODE_ENV === 'test' ? 'test' : dev;

require('dotenv').config({ path: `/${__dirname}/../.env.${env}` });

console.log(__dirname);
if (!process.env.PGDATABASE) {
    throw new Error('PGDATABASE not set!');
}  else {
    console.log(`PGDATABASE set as ${process.env.PGDATABASE}`);
}

const db = new Pool();

module.exports = db;