import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductForm from '../EditProductForm/EditProductForm.jsx';
import './List.css';

const List = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // Function to fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/Web/backend/GetProduct.php');
            if (response.data.success) {
                setProducts(response.data.data);
            } else {
                setError(response.data.message || 'Unknown error occurred.');
            }
        } catch (err) {
            console.error('Axios error:', err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Error fetching products.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.post('http://localhost/Web/backend/RemoveProduct.php', { product_id: productId });
            setProducts(products.filter(product => product.product_id !== productId));
        } catch (err) {
            console.error('Delete error:', err);
            setError('Error deleting product.');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSave = () => {
        fetchProducts(); // Refresh product list after saving
        setEditingProduct(null);
    };

    const handleCancel = () => {
        setEditingProduct(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="list-add-flex-col">
            <p>All Product List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <div><b>ProductID</b></div>
                    <div><b>Image</b></div>
                    <div><b>Name</b></div>
                    <div><b>Category</b></div>
                    <div><b>Buying Price</b></div>
                    <div><b>Selling Price</b></div>
                    <div><b>Quantity</b></div>
                    <div><b>Action</b></div>
                </div>
                {products.map(product => (
                    <div className="list-table-format" key={product.product_id}>
                        <div>{product.product_id}</div>
                        <div>
                            <img 
                                src={product.image_path ? `http://localhost/Web/Backend/${product.image_path}` : 'default_image_path.jpg'} 
                                alt={product.name} 
                                style={{ width: '60px', height: '60px' }} 
                            />
                        </div>
                        <div>{product.name}</div>
                        <div>{product.category || 'N/A'}</div>
                        <div>${product.bprice}</div>
                        <div>${product.sprice}</div>
                        <div>{product.quantity}</div>
                        <div className="buttonx">
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.product_id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {editingProduct && (
                <EditProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default List;
