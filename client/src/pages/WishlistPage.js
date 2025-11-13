import React, { useState, useEffect } from 'react';
import '../styles/WishlistPage.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist');
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setWishlist(wishlist.filter(item => item.productId !== productId));
        alert('Removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <h1>My Wishlist</h1>

        {loading ? (
          <p className="loading">Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-summary">
              <div className="summary-item">
                <span className="label">Total Items</span>
                <span className="value">{wishlist.length}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Value</span>
                <span className="value">₹{totalValue.toFixed(2)}</span>
              </div>
            </div>

            <div className="wishlist-items">
              {wishlist.map(item => (
                <div key={item._id} className="wishlist-item">
                  <div className="item-info">
                    <h3>{item.productName}</h3>
                    <p className="item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default WishlistPage;
