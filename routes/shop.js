const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop');
const shopRoute = express.Router();

shopRoute.get('/',shopController.getIndex);
shopRoute.get('/products',shopController.getProducts);
shopRoute.get('/products/:productId',shopController.getProduct);
shopRoute.get('/cart',shopController.getCart);
shopRoute.post('/cart',shopController.postCart);
shopRoute.post('/cart-delete-item', shopController.postCartDeleteProduct);
shopRoute.post('/create-order',shopController.postOrder);
shopRoute.get('/orders',shopController.getOrders);

module.exports = shopRoute;