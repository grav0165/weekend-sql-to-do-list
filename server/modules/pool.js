const pg = require('pg');

let pool 

if(process.env.DATABASE_URL) {
    pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}) 
} else {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
};

module.exports = pool;