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
    const mapped = mapRequestToOrder(requestData);
  
    const createdOrder = await createOrder(mapped);
    const items = await createOrderItems(mapped.orderId, mapped.items);
  
    return { ...createdOrder, items };
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
  
    // Simples para o teste: recria os itens
    await deleteOrder(orderId);
    await createOrder(mapped);
    const newItems = await createOrderItems(mapped.orderId, mapped.items);
  
    return { ...mapped, items: newItems };
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
  