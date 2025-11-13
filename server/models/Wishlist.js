import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: String,
  price: Number,
  addedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Wishlist', wishlistSchema);
