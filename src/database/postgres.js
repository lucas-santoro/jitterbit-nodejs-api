const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function initTables() 
{
  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      orderId VARCHAR(255) PRIMARY KEY,
      value NUMERIC NOT NULL,
      creationDate TIMESTAMP NOT NULL
    );
  `;

  const createItemsTable = `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      orderId VARCHAR(255) NOT NULL,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price NUMERIC NOT NULL,
      CONSTRAINT fk_order
        FOREIGN KEY(orderId)
        REFERENCES orders(orderId)
        ON DELETE CASCADE
    );
  `;

  try 
  {
    await pool.query(createOrdersTable);
    await pool.query(createItemsTable);
    console.log("[PostgreSQL] Tables checked/created.");
  } catch (error) 
  {
    console.error("[PostgreSQL] Failed to create tables:", error.message);
  }
}

async function testConnection() 
{
  try 
  {
    await pool.query('SELECT 1');
    console.log("[PostgreSQL] Connection OK.");
    await initTables();
  } catch (err) 
  {
    console.error("[PostgreSQL] Connection error:", err.message);
  }
}

testConnection();

module.exports = pool;
