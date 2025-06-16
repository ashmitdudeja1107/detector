require("dotenv").config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);


const pool = require('./config/db');

 // your DB config file

async function initializeDatabase() {
  try {
   
await pool.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15)
  );

    `);

    console.log("✅ Users table ensured");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
}

initializeDatabase();
