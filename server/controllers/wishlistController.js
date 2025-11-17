import { addToWishlist, getWishlist, removeFromWishlist } from '../models/Wishlist.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../data/mockProducts.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

export const getWishlist_controller = async (req, res) => {
  try {
    const wishlist = await getWishlist();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

export const addToWishlist_controller = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already in wishlist
    const wishlistItems = await getWishlist();
    const exists = wishlistItems.find(w => w.productId === productId);
    if (exists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const insertedId = await addToWishlist({
      productId,
      productName: product.name,
      price: Math.min(...product.storePrices.map(sp => sp.price))
    });

    res.status(201).json({
      _id: insertedId,
      productId,
      productName: product.name,
      price: Math.min(...product.storePrices.map(sp => sp.price))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

export const removeFromWishlist_controller = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedCount = await removeFromWishlist(parseInt(productId));

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};
