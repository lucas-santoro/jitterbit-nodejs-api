const 
{
    createOrderService,
    getOrderService,
    listOrdersService,
    updateOrderService,
    deleteOrderService,
  } = require('../services/order.service');
  
  async function createOrderController(req, res) 
  {
    try {
      const data = req.body;
  
      if (!data.numeroPedido) 
      {
        return res.status(400).json({ error: 'numeroPedido is required.' });
      }
  
      if (!Array.isArray(data.items) || data.items.length === 0) 
      {
        return res
          .status(400)
          .json({ error: 'items must be a non empty array.' });
      }
  
      const result = await createOrderService(data);
  
      return res.status(201).json({
        message: 'Order created successfully.',
        data: result,
      });
    } catch (err)
     {
      console.error('Error while creating order:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while creating the order.',
      });
    }
  }
  
  async function getOrderController(req, res) 
  {
    try {
      const { orderId } = req.params;
  
      const result = await getOrderService(orderId);
      if (!result) 
      {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      return res.status(200).json({
        message: 'Order retrieved successfully.',
        data: result,
      });
    } catch (err) 
    {
      console.error('Error while fetching order:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while fetching the order.',
      });
    }
  }
  
  async function listOrdersController(_, res) 
  {
    try {
      const result = await listOrdersService();
  
      return res.status(200).json({
        message: 'Orders retrieved successfully.',
        total: result.length,
        data: result,
      });
    } catch (err) 
    {
      console.error('Error while listing orders:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while listing the orders.',
      });
    }
  }

  async function updateOrderController(req, res) 
  {
    try {
      const { orderId } = req.params;
      const updateData = req.body;
  
      const updated = await updateOrderService(orderId, updateData);
      if (!updated) 
      {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      return res.status(200).json({
        message: 'Order updated successfully.',
        data: updated,
      });
    } catch (err) 
    {
      console.error('Error while updating order:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while updating the order.',
      });
    }
  }

  async function deleteOrderController(req, res) 
  {
    try {
      const { orderId } = req.params;
  
      const deleted = await deleteOrderService(orderId);
      if (!deleted) 
      {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      return res.status(200).json({
        message: `Order ${orderId} deleted successfully.`,
      });
    } catch (err) 
    {
      console.error('Error while deleting order:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while deleting the order.',
      });
    }
  }
  
  module.exports = 
  {
    createOrderController,
    getOrderController,
    listOrdersController,
    updateOrderController,
    deleteOrderController,
  };
  