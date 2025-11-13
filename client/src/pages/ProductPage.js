import React, { useState, useEffect } from 'react';
import '../styles/ProductPage.css';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      checkWishlist(data.id);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist');
      const wishlist = await response.json();
      setIsWishlisted(wishlist.some(item => item.productId === productId));
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });

      if (response.ok) {
        setIsWishlisted(true);
        alert('Added to wishlist!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleBuyNow = () => {
    navigate('/order', { state: { product } });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p className="error">Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-page-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <div className="product-detail">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="action-buttons">
              <button
                className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={handleAddToWishlist}
                disabled={isWishlisted}
              >
                {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>

            <div className="price-comparison">
              <h2>Price Comparison</h2>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Store</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.storePrices.map((sp, idx) => (
                    <tr key={idx}>
                      <td>{sp.store}</td>
                      <td className="price">₹{sp.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="buy-button"
                          onClick={handleBuyNow}
                        >
                          Buy from {sp.store}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
