import dotenv from 'dotenv';
dotenv.config();

export default {
    url: process.env.DB_URL,
    port: process.env.DB_PORT,
}