import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL
});

export const getProducts = () => api.get('/products/all');
export const createProduct = (productData) => api.post('/products/create', productData);
export const updateProduct = (id, productData) => api.put(`/products/update/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/delete/${id}`);

export default api;