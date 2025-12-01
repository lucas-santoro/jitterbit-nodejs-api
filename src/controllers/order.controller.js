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
  
      if (!data.numeroPedido || !data.items) 
        {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
  
      const result = await createOrderService(data);
      return res.status(201).json(result);
    } catch (err) 
    {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create order.' });
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
  
      return res.json(result);
    } catch (err) 
    {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch order.' });
    }
  }
  
  async function listOrdersController(_, res) 
  {
    try {
      const result = await listOrdersService();
      return res.json(result);
    } catch (err) 
    {
      console.error(err);
      return res.status(500).json({ error: 'Failed to list orders.' });
    }
  }
  
  // -----------------------------
  // UPDATE
  // -----------------------------
  async function updateOrderController(req, res) 
  {
    try {
      const { orderId } = req.params;
  
      const result = await updateOrderService(orderId, req.body);
      if (!result) 
        {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      return res.json(result);
    } catch (err) 
    {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update order.' });
    }
  }

  async function deleteOrderController(req, res) 
  {
    try 
    {
      const { orderId } = req.params;
  
      const result = await deleteOrderService(orderId);
      if (!result) 
        {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      return res.json({ message: 'Order deleted successfully.' });
    } catch (err) 
    {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete order.' });
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
  