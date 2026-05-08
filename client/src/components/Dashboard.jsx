/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

const ProductFormData = { 
    productName: '', 
    price: '', 
    oldPrice: '', 
    category: '', 
    isActive: true, 
    description: '' 
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState(ProductFormData);
    const [showPopup, setShowPopup] = useState(false);

    const categories = ["Vegetables", "Fruits & Nuts", "Dairy & creams", "Packages Food", "Staples"];

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleSave = async () => {
        try {
            const payload = { 
                ...newProduct, 
                price: Number(newProduct.price) || 0,
                oldPrice: Number(newProduct.oldPrice) || 0
            };
            
            if (newProduct._id) {
                await updateProduct(newProduct._id, payload);
            } else {
                await createProduct(payload);
            }
            
            fetchProducts();
            closePopup();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const editRequest = (id) => {
        const product = products.find(p => p._id === id);
        if (product) {
            setNewProduct({ ...product });
            setShowPopup(true);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    const closePopup = () => {
        setNewProduct(ProductFormData);
        setShowPopup(false);
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="text-xl font-semibold">Product List</h1>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                    onClick={() => setShowPopup(true)}
                >
                    Add Product
                </button>
            </div>

            <div className="border rounded shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 font-medium text-sm">Product Name</th>
                            <th className="p-3 font-medium text-sm">Price</th>
                            <th className="p-3 font-medium text-sm">Old Price</th>
                            <th className="p-3 font-medium text-sm">Category</th>
                            <th className="p-3 font-medium text-sm">Status</th>
                            <th className="p-3 font-medium text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((prod) => (
                            <tr key={prod._id} className="hover:bg-gray-50">
                                <td className="p-3 text-sm">{prod.productName}</td>
                                <td className="p-3 text-sm font-semibold">${prod.price}</td>
                                <td className="p-3 text-sm text-gray-400 line-through">${prod.oldPrice}</td>
                                <td className="p-3 text-sm">{prod.category}</td>
                                <td className="p-3 text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        prod.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {prod.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 text-sm text-center space-x-2">
                                    <button 
                                        className="text-blue-600 hover:underline" 
                                        onClick={() => editRequest(prod._id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="text-red-600 hover:underline" 
                                        onClick={() => handleDeleteProduct(prod._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No products available.</div>
                )}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                            <h2 className="font-semibold">{newProduct._id ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={closePopup} className="text-gray-500 hover:text-black">&times;</button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input 
                                    className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
                                    name="productName" 
                                    value={newProduct.productName} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input 
                                        type="number"
                                        className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
                                        name="price" 
                                        value={newProduct.price} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1">Old Price</label>
                                    <input 
                                        type="number"
                                        className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
                                        name="oldPrice" 
                                        value={newProduct.oldPrice} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select 
                                    className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
                                    name="category" 
                                    value={newProduct.category} 
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="isActive"
                                    name="isActive" 
                                    checked={newProduct.isActive} 
                                    onChange={handleInputChange} 
                                />
                                <label htmlFor="isActive" className="text-sm font-medium">Is Active</label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea 
                                    className="w-full border rounded p-2 text-sm focus:outline-blue-500 h-24" 
                                    name="description" 
                                    value={newProduct.description} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 border-t flex justify-end gap-2">
                            <button 
                                className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300" 
                                onClick={closePopup}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600" 
                                onClick={handleSave}
                            >
                                {newProduct._id ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
