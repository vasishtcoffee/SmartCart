import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const url = query
        ? `http://localhost:5000/api/products?search=${query}`
        : `http://localhost:5000/api/products`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero">
          <h1>Welcome to SmartCart</h1>
          <p>Compare prices across multiple stores and save money</p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
