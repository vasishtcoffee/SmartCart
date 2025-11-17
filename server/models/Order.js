import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

export async function insertOrder(orderData) {
  try {
    await client.connect(); 
  const db = client.db('smartcart'); 
    const orders = db.collection('orders');
    const result = await orders.insertOne({
      items: orderData.items,
      total: orderData.total,
      orderNumber: orderData.orderNumber,
      createdAt: new Date()
    });
    return result.insertedId;
  } finally {
    await client.close();
  }
}

  