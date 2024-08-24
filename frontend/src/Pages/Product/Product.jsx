import React, { useState, useEffect } from 'react';
import './Product.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        id: "",
        name: "",
        bprice: "",
        sprice: "",
        category: "Lunch",
        quantity: ""
    });

    // Reset form on success
    useEffect(() => {
        if (image) {
            URL.revokeObjectURL(image.preview); // Cleanup URL object
        }
    }, [image]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onFileChangeHandler = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Please upload an image.');
            return;
        }

        if (!data.id || !data.name || !data.bprice || !data.quantity || !data.sprice) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append("product_id", data.id);
        formData.append("name", data.name);
        formData.append("bprice", data.bprice);
        formData.append("sprice", data.sprice);
        formData.append("category", data.category);
        formData.append("quantity", data.quantity);
        formData.append("image", image);

        try {
            const response = await axios.post('http://localhost/Web/backend/AddProduct.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                // Reset form state
                setData({
                    id: "",
                    name: "",
                    bprice: "",
                    sprice: "",
                    category: "Lunch",
                    quantity: ""
                });
                setImage(null);
                toast.success(response.data.message || 'Product added successfully');
            } else {
                toast.error(response.data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error adding product. Please try again.');
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-product-name">
                    <p>Product ID</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.id}
                        type="text"
                        name="id"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.ua} // Ensure 'assets.ua' is a valid placeholder image path
                            alt="Upload Area"
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        onChange={onFileChangeHandler}
                        required
                    />
                </div>
                <div className="add-product-name">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>
                 <div className="add-category-flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            required
                        >
                            <option value="Lunch">Lunch</option>
                            <option value="Soup">Soup</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Offers">Offers</option>
                        </select>
                    </div>
                    <div className="add-category-price">
                    <div className="add-price-flex-col">
                        <p>Product Buying Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.bprice}
                            type="number"
                            name="bprice"
                            placeholder="Rs.2000"
                            required
                        />
                    </div>
                    <div className="add-price-flex-col">
                        <p>Product Selling Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.sprice}
                            type="number"
                            name="sprice"
                            placeholder="Rs.2000"
                            required
                        />
                    </div>
                    <div className="add-quantity-flex-col">
                        <p>Product Quantity</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.quantity}
                            type="number"
                            name="quantity"
                            placeholder="5"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
            <ToastContainer /> {/* Make sure this is included in the component */}
        </div>
    );
};

export default Product;
