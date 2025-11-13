import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      items,
      total,
      orderNumber
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
      confirmation: {
        orderNumber,
        total,
        itemCount: items.length,
        estimatedDelivery: '5-7 business days'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
