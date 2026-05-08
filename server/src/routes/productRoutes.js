const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controller/productController");

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
