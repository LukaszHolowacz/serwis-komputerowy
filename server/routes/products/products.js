const express = require('express');
const router = express.Router();
const productService = require('./productService');

router.get('/get-products-categories', productService.getProductsCategories);

module.exports = router;