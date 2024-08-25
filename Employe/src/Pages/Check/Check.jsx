import React, { useState } from 'react';
import './Check.css';

const Check = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost/Web/backend/GetSearch.php?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
        setError('');
      } else {
        setSearchResults([]);
        setError(data.message);
      }
    } catch (error) {
      setError('Error searching products');
      console.error('Error searching products:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="product-search">
      <h2>Product Search</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter product ID, name, or category..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <hr />
      {error && <p className="error-message">{error}</p>}
      <div className="search-results">
        {searchResults.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ProductID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Available Quantity</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>${product.bprice}</td>
                  <td>${product.sprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Check;
