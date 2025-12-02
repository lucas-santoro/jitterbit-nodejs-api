const { Router } = require('express');
const router = Router();

const {
  createOrderController,
  getOrderController,
  listOrdersController,
  updateOrderController,
  deleteOrderController,
} = require('../controllers/order.controller');

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numeroPedido
 *               - valorTotal
 *               - dataCriacao
 *               - items
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "v10000001"
 *               valorTotal:
 *                 type: number
 *                 example: 1234
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-19T12:24:11.5299601+00:00"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: number
 *                     valorItem:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Order already exists
 */
router.post('/', createOrderController);

/**
 * @openapi
 * /order/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "v10000001"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
router.get('/:orderId', getOrderController);

/**
 * @openapi
 * /order/list/all:
 *   get:
 *     summary: List all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get('/list/all', listOrdersController);

/**
 * @openapi
 * /order/{orderId}:
 *   put:
 *     summary: Update an existing order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "v10000001"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 example: 7777
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: number
 *                     quantidadeItem:
 *                       type: number
 *                     valorItem:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put('/:orderId', updateOrderController);

/**
 * @openapi
 * /order/{orderId}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "v10000001"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:orderId', deleteOrderController);

module.exports = router;
