const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.post("/order", productController.placeOrder);
productRouter.post("/", productController.getAllProducts);

module.exports = productRouter;
