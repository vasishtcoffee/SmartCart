import React, { useState } from 'react';
import '../styles/OrderPage.css';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const product = location.state?.product;

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="order-container">
          <p className="error">No product selected for order</p>
        </div>
      </>
    );
  }

  const handlePlaceOrder = async (store) => {
    setSelectedStore(store);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              productId: product.id,
              productName: product.name,
              store: store.store,
              price: store.price
            }
          ],
          total: store.price
        })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderConfirmation(data.confirmation);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmation) {
    return (
      <>
        <Navbar />
        <div className="order-container">
          <div className="confirmation-box">
            <h1>✅ Order Confirmed!</h1>
            <div className="confirmation-details">
              <p>
                <strong>Order Number:</strong> {orderConfirmation.orderNumber}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{orderConfirmation.total.toFixed(2)}
              </p>
              <p>
                <strong>Items:</strong> {orderConfirmation.itemCount}
              </p>
              <p>
                <strong>Estimated Delivery:</strong> {orderConfirmation.estimatedDelivery}
              </p>
            </div>
            <button className="home-button" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="order-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="order-review">
          <h1>Review Order</h1>

          <div className="order-product">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="store-options">
            <h2>Select Store & Place Order</h2>
            <div className="store-list">
              {product.storePrices.map((store, idx) => (
                <div key={idx} className="store-option">
                  <div className="store-info">
                    <h3>{store.store}</h3>
                    <p className="store-price">₹{store.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="order-button"
                    onClick={() => handlePlaceOrder(store)}
                    disabled={loading}
                  >
                    {loading && selectedStore?.store === store.store
                      ? 'Processing...'
                      : 'Order Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
