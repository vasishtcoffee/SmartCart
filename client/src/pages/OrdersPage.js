import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h1>Order History</h1>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <p>No orders placed yet</p>
            <Link to="/" className="continue-shopping">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3 className="order-number">{order.orderNumber}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="order-total">
                    <span className="label">Total</span>
                    <span className="amount">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx} className="item">
                        <span className="item-name">{item.productName}</span>
                        <span className="item-store">{item.store}</span>
                        <span className="item-price">₹{item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OrdersPage;
