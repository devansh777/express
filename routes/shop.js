const path = require('path');
const express = require('express');
const productsController = require('../controllers/products');
const shopRoute = express.Router();

shopRoute.get('/',productsController.getProducts);

module.exports = shopRoute;