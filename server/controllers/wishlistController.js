import Wishlist from '../models/Wishlist.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../data/mockProducts.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find().sort({ addedAt: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already in wishlist
    const exists = await Wishlist.findOne({ productId });
    if (exists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      productId,
      productName: product.name,
      price: Math.min(...product.storePrices.map(sp => sp.price))
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Wishlist.findOneAndDelete({ productId: parseInt(productId) });

    if (!result) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};
