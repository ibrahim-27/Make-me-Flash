import mysql from 'mysql2';
import env from 'dotenv';
env.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

export default db;