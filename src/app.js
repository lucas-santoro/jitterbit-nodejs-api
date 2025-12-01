require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const orderRoutes = require('./routes/order.routes');
app.use('/order', orderRoutes);

module.exports = app;
