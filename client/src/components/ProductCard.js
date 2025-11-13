import React from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const minPrice = Math.min(...product.storePrices.map(sp => sp.price));

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="min-price">₹{minPrice.toFixed(2)}</span>
          <span className="price-label">Lowest Price</span>
        </div>
        <Link to={`/product/${product.id}`} className="view-button">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
