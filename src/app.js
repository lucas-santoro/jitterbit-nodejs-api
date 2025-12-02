require('dotenv').config();
const { swaggerUi, specs } = require("./config/swagger");
const express = require('express');
const app = express();

app.use(express.json());

const orderRoutes = require('./routes/order.routes');
app.use('/order', orderRoutes);

module.exports = app;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));