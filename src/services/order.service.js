const 
{
    createOrder,
    createOrderItems,
    getOrder,
    getOrderItems,
    listOrders,
    updateOrder,
    deleteOrder,
  } = require('../models/order.model');
  
  const { mapRequestToOrder } = require('../utils/mapper');

  async function createOrderService(requestData)
  {
    try 
    {
      const mapped = mapRequestToOrder(requestData);
  
      const createdOrder = await createOrder(mapped);
      const items = await createOrderItems(mapped.orderId, mapped.items);
  
      return { ...createdOrder, items };
  
    } catch (err) 
    {
  
      if (err.code === '23505') 
      {
        const duplicateError = new Error("Order already exists.");
        duplicateError.status = 409;
        throw duplicateError;
      }
        throw err;
    }
  }
  async function getOrderService(orderId) 
  {
    const order = await getOrder(orderId);
    if (!order) return null;
  
    const items = await getOrderItems(orderId);
    return { ...order, items };
  }
  
  async function listOrdersService() 
  {
    return await listOrders();
  }
  
  async function updateOrderService(orderId, updateData) 
  {
    const mapped = mapRequestToOrder(updateData);
  
    const updated = await updateOrder(orderId, mapped);
    if (!updated) return null;
  
    await deleteOrder(orderId);
    const orderToCreate = { ...mapped, orderId: orderId };
    
    await createOrder(orderToCreate);
    const newItems = await createOrderItems(orderId, mapped.items);
  
    return { ...orderToCreate, items: newItems };
  }
  
  async function deleteOrderService(orderId) 
  {
    return await deleteOrder(orderId);
  }
  
  module.exports = 
  {
    createOrderService,
    getOrderService,
    listOrdersService,
    updateOrderService,
    deleteOrderService,
  };
  