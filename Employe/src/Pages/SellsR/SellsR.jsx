import React, { useState } from 'react';
import './SellsR.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SellRForm() {
  const [product_id, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      product_id: product_id,
      quantity: quantity,
      price: price
    };

    try {
      const response = await fetch('http://localhost/Web/backend/SellR.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success('Return added successfully');
        // Optionally, clear form fields
        setProductId('');
        setQuantity('');
        setPrice('');
      } else {
        alert('Error: ' + responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding sale. Please try again.');
    }
  };

  return (
    <div className="main1">
    <div className="sell-container">
      <form className="sell-form" onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={product_id}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Sells Return</button>
      </form> 
    </div>
    <ToastContainer/>
    </div>
  );
}

export default SellRForm;
