import React, { useState, useEffect } from 'react';
import './Bill.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bill = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(''); 
  const [productDetails, setProductDetails] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (productId !== '') {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost/Web/backend/Bill.php?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setProductDetails(data.data);
      } else {
        setProductDetails(null);
        
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Error fetching product details');
    }
  };

  const addToBill = () => {
    if (productDetails) {
      const enteredQuantity = parseInt(quantity, 10);

      if (enteredQuantity <= 0) {
        toast.error('Quantity must be greater than zero');
        return;
      }

      if (enteredQuantity > productDetails.quantity) {
        toast.error(`Cannot add more than available quantity (${productDetails.quantity})`);
        return;
      }

      const existingItemIndex = billItems.findIndex(item => item.id === productDetails.product_id);
      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...billItems];
        updatedItems[existingItemIndex].quantity += enteredQuantity;
        updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
        setBillItems(updatedItems);
      } else {
        // Add new item
        const newItem = {
          id: productDetails.product_id,
          name: productDetails.name,
          price: productDetails.sprice,
          quantity: enteredQuantity,
          totalPrice: productDetails.sprice * enteredQuantity
        };
        setBillItems([...billItems, newItem]);
      }

      // Update total
      setTotal(total + productDetails.sprice * enteredQuantity);

      // Clear product details and quantity
      setProductDetails(null);
      setQuantity('');
    }
  };

  const removeItem = (id) => {
    const itemToRemove = billItems.find(item => item.id === id);
    if (itemToRemove) {
      const updatedBillItems = billItems.filter(item => item.id !== id);
      setBillItems(updatedBillItems);
      setTotal(total - itemToRemove.totalPrice);
    }
  };

  const submitBill = async () => {
    try {
      const response = await fetch('http://localhost/Web/backend/SubmitBill.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billItems: billItems,
          total: total
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit bill');
      }
  
      const data = await response.json();
      if (data.success) {
        toast.success('Bill submitted successfully');
        setBillItems([]);
        setTotal(0);
        setProductId('');
        setQuantity(1); // Reset quantity to default
      } else {
        toast.error('Failed to submit bill: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting bill:', error);
      toast.error('Failed to submit bill: ' + error.message);
    }
  };
  

  return (
    <div className="bill-container">
      <h2>Add Product to Bill</h2>
      <div className="bill-form">
        <label htmlFor="productId">ProductID:</label>
        <input 
          type="text" 
          id="productId" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
        />
        <label htmlFor="quantity">Quantity:</label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value))} 
        />
        <button className="add-button" onClick={addToBill}>Add to Bill</button>
      </div>
      
      {productDetails && (
        <div className="product-details">
          <h3>Product Details</h3>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Product Name:</td>
                <td>{productDetails.name}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>${productDetails.sprice}</td>
              </tr>
              <tr>
                <td>Available Quantity:</td>
                <td>{productDetails.quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h2>Bill</h2>
      <table className="bill-table">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.totalPrice}</td>
              <td><button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="total">Total: ${total}</p>
      <button className="submit-button" onClick={submitBill}>Submit Bill</button>
      <ToastContainer />
    </div>
  );
};

export default Bill;
