const express = require('express');
const router = express.Router();
const orderSearchService = require('./orderSearchService');
const orderService = require('./orderService');

router.post('/addOrder', orderService.registerOrder);
router.get('/search', orderSearchService.orderSearch);
router.get('/change-order-status', orderService.changeOrderStatus);
router.get('/get-order-products', orderService.getOrderProducts);
router.get('/get-order-data', orderService.getOrderData);
router.delete('/delete-order-product', orderService.deleteOrderProduct);


module.exports = router;