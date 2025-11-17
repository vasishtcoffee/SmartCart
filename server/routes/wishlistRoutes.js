import express from 'express';
import { getWishlist_controller, addToWishlist_controller, removeFromWishlist_controller } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/', getWishlist_controller);
router.post('/add', addToWishlist_controller);
router.delete('/remove/:productId', removeFromWishlist_controller);

export default router;
