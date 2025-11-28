import mysql from 'mysql2/promise';
import { env } from '../utils/env.js';
let db;

try {
    db = await mysql.createConnection({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME
}) 
    console.log("db is connected");
} catch(error){
    console.log("error occured while connecting db", error.msg);
    process.exit(1);
}
export {db};
