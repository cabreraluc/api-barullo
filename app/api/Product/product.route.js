const express = require("express");
const {
  getProductsPraginate,
  getAllProducts,
  addProduct,
} = require("./product.controller");

const router = express.Router();

router.get("/products", getProductsPraginate);
router.get("/allproducts", getAllProducts);
router.post("/createproduct", addProduct);

module.exports = router;
