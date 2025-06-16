require("dotenv").config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);


const pool = require('./config/db');

 // your DB config file

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  status VARCHAR(50),
  isdeleted BOOLEAN DEFAULT false,
  phone_number VARCHAR(20)
);

    `);

    console.log("✅ Users table ensured");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
}

initializeDatabase();
