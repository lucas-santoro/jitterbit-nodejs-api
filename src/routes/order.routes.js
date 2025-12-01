const { Router } = require('express');
const router = Router();

const 
{
  createOrderController,
  getOrderController,
  listOrdersController,
  updateOrderController,
  deleteOrderController,
} = require('../controllers/order.controller');

router.post('/', createOrderController);
router.get('/:orderId', getOrderController);
router.get('/list/all', listOrdersController);
router.put('/:orderId', updateOrderController);
router.delete('/:orderId', deleteOrderController);

module.exports = router;
