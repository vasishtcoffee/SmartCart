import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function addToWishlist(productData) {
  try {
    await client.connect();
    const db = client.db('smartcart');
    const wishlist = db.collection('wishlist');
    const result = await wishlist.insertOne({
      productId: productData.productId,
      productName: productData.productName,
      price: productData.price,
      addedAt: new Date()
    });
    return result.insertedId;
  } finally {
    await client.close();
  }
}

export async function getWishlist() {
  try {
    await client.connect();
    const db = client.db('smartcart');
    const wishlist = db.collection('wishlist');
    const items = await wishlist.find().sort({ addedAt: -1 }).toArray();
    return items;
  } finally {
    await client.close();
  }
}

export async function removeFromWishlist(productId) {
  try {
    await client.connect();
    const db = client.db('smartcart');
    const wishlist = db.collection('wishlist');
    const result = await wishlist.deleteOne({ productId: productId });
    return result.deletedCount;
  } finally {
    await client.close();
  }
}
