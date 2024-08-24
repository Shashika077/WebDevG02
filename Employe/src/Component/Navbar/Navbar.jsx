import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [productsWithLowQuantity, setProductsWithLowQuantity] = useState([]);
  const [userName, setUserName] = useState(''); 
  useEffect(() => {
    fetchUserName(); 
  
    checkProductQuantity();
  }, []);

  const fetchUserName = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost/Web/backend/decode-token.php', {
          token: token
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = response.data;
        if (data.status === 'success') {
          setUserName(data.user.name2);
        } else {
          console.error('Error fetching user info:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
    }
  };
  
  

  const checkProductQuantity = async () => {
    try {
      const response = await fetch('http://localhost/Web/backend/GetProduct.php');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      if (data.success) {
        const products = data.data;
        const hasProductsLessThanTwo = products.some(product => product.quantity <= 2);
        if (hasProductsLessThanTwo) {
          setNotificationType('lowQuantity');
          setProductsWithLowQuantity(products.filter(product => product.quantity <= 2));
        } else {
          setNotificationType('highQuantity');
        }
      } else {
        throw new Error(data.message);
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
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="navbar">
      <div className="nav-r">
      <img src={assets.logo} alt="" className="nav-logo" />
      <img src={assets.menu} alt="" className="nav-menu" />
       </div>
      <div className="nav-user-info">
        <span className="nav-user-name">Employee Name : {userName}</span>
      </div>
      <div className="nav-l">
      <button onClick={handleLogout} className="nav-button">Logout</button>

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
