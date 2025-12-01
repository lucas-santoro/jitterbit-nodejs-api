const pool = require('../database/postgres');


async function createOrder(order) 
{
  const { orderId, value, creationDate } = order;

  const query = `
    INSERT INTO orders (orderId, value, creationDate)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await pool.query(query, [orderId, value, creationDate]);
  return result.rows[0];
}

async function createOrderItems(orderId, items) 
{
  const query = `
    INSERT INTO items (orderId, productId, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const insertedItems = [];

  for (const item of items) 
    {
    const res = await pool.query(query, [
      orderId,
      item.productId,
      item.quantity,
      item.price,
    ]);
    insertedItems.push(res.rows[0]);
  }

  return insertedItems;
}

async function getOrder(orderId) 
{
  const query = `SELECT * FROM orders WHERE orderId = $1;`;
  const result = await pool.query(query, [orderId]);
  return result.rows[0];
}

async function getOrderItems(orderId) 
{
  const query = `SELECT * FROM items WHERE orderId = $1;`;
  const result = await pool.query(query, [orderId]);
  return result.rows;
}

async function listOrders() 
{
  const query = `SELECT * FROM orders ORDER BY creationDate DESC;`;
  const result = await pool.query(query);
  return result.rows;
}


async function updateOrder(orderId, data) 
{
  const { value, creationDate } = data;

  const query = `
    UPDATE orders
    SET value = $1, creationDate = $2
    WHERE orderId = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [
    value,
    creationDate,
    orderId,
  ]);

  return result.rows[0];
}

async function deleteOrder(orderId) 
{
  const query = `DELETE FROM orders WHERE orderId = $1 RETURNING *;`;

  const result = await pool.query(query, [orderId]);
  return result.rows[0];
}

module.exports = 
{
  createOrder,
  createOrderItems,
  getOrder,
  getOrderItems,
  listOrders,
  updateOrder,
  deleteOrder,
};
