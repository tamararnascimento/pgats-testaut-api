const express = require('express');
const router = express.Router();
const purchaseService = require('../service/purchaseService');
const authMiddleware = require('../service/authMiddleware');

router.post('/', authMiddleware, purchaseService.makePurchase);

module.exports = router;
