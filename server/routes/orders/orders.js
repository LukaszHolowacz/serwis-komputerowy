const express = require('express');
const pool = require('../../database');
const router = express.Router();
const orderSearchService = require('./orderSearchService');
const orderService = require('./orderService');

router.post('/addOrder', orderService.registerOrder);
router.get('/search', orderSearchService.orderSearch);
router.get('/change-order-status', orderService.changeOrderStatus);

module.exports = router;