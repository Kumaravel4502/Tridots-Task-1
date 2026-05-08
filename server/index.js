const express = require("express");
const cors = require("cors");
const ConnectDB = require("./src/config/DB");
const productRoutes = require("./src/routes/productRoutes");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json("API Working Properly")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});