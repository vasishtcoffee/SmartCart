import { insertOrder } from '../models/Order.js';
import { MongoClient } from 'mongodb';


export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    const orderNumber = `ORD-${Date.now()}`;
    const orderData = {
      items,
      total,
      orderNumber
    };
    const insertedId = await insertOrder(orderData);
    res.status(201).json({
      message: 'Order created successfully',
      order: { ...orderData, _id: insertedId },
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
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri);
  try {
    await client.connect();
  const db = client.db('smartcart'); 
    const orders = await db.collection('orders').find().sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  } finally {
    await client.close();
  }
};
