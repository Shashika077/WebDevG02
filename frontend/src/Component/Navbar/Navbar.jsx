import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [productsWithLowQuantity, setProductsWithLowQuantity] = useState([]);

  useEffect(() => {
    checkProductQuantity(); // Check product quantity on component mount
  }, []);

  const checkProductQuantity = async () => {
    try {
      const response = await fetch('http://localhost/Web/backend/GetProduct.php');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      if (data.success) {
        const products = data.data; // Assuming data is an array of products
        const lowQuantityProducts = products.filter(product => product.quantity <= 2);

        if (lowQuantityProducts.length > 0) {
          setProductsWithLowQuantity(lowQuantityProducts);
          setNotificationType('lowQuantity');
        } else {
          setNotificationType('highQuantity');
        }
      } else {
        throw new Error(data.message); // Handle backend error messages
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const toggleOverlay = () => {
    if (notificationType === 'lowQuantity') {
      fetchLowQuantityProducts();
      setShowOverlay(!showOverlay);
    }
  };

  const fetchLowQuantityProducts = async () => {
    try {
      const response = await fetch('http://localhost/Web/backend/GetLowQuantityProducts.php');
      if (!response.ok) {
        throw new Error('Failed to fetch low quantity products');
      }
      const data = await response.json();
      if (data.success) {
        setProductsWithLowQuantity(data.products);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching low quantity products:', error.message);
    }
  };

  return (

    <div className="navbar">
      <div className="nav-l">
      <img src={assets.logo} alt="" className="nav-logo" />
      <img src={assets.menu} alt="" className="nav-menu" />
      </div>
      <div className="nav-r">
      <div className="nav-search-container">
        <input type="text" placeholder="       Search..." className="nav-input" />
        <img src={assets.search} alt="" className="nav-search" />
      </div>

      <button onClick={handleLogout} className="nav-button">Logout</button>

      {/* Conditional rendering based on notification type */}
      {notificationType === 'lowQuantity' && (
        <img
          src={assets.noti1}
          alt=""
          className="nav-noti1"
          onClick={toggleOverlay}
        />
      )}
      {notificationType === 'highQuantity' && (
        <img
          src={assets.notii}
          alt=""
          className="nav-noti"
          onClick={toggleOverlay}
        />
      )}
</div>
      {/* Overlay to display products with low quantity */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Products with Low Quantity</h2>
            <ul>
              {productsWithLowQuantity.map(product => (
                <li key={product.id}>
                  {product.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
            <button onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
