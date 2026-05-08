const Product = require("../model/productModel");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

const createProduct = async (req, res) => {
    try {
        const { productName, price, oldPrice, category, isActive, description } = req.body;
        const newProduct = new Product({ productName, price, oldPrice, category, isActive, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, oldPrice, category, isActive, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, price, oldPrice, category, isActive, description },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
