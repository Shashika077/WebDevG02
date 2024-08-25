import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProductForm.css'; // Import the CSS file

const EditProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...product });

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.product_id) {
                throw new Error('Product ID is missing');
            }
            const response = await axios.post('http://localhost/Web/backend/EditProduct.php', formData);
            if (response.data.success) {
                onSave(); // Notify parent to refresh the product list
            } else {
                console.error(response.data.message);
            }
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Edit Product</h2>
                <form className="edit-product-form" onSubmit={handleSubmit}>
                    <input type="hidden" name="product_id" value={formData.product_id || ''} />
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Category:
                        <select className="ca"
                            onChange={handleChange}
                            value={formData.category}
                            name="category"
                            required
                        >
                            <option value="Lunch">Lunch</option>
                            <option value="Soup">Soup</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Offers">Offers</option>
                        </select>
                    </label>
                    
                    <label>
                        Selling Price:
                        <input
                            type="number"
                            step="0.01"
                            name="sprice"
                            value={formData.sprice || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
