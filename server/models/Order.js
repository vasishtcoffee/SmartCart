import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: Number,
      productName: String,
      store: String,
      price: Number
    }
  ],
  total: Number,
  orderNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
