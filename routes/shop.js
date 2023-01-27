const path = require('path');
const express = require('express');
const adminData = require('./admin');
const rootPath = require('../util/path');
const shopRoute = express.Router();

shopRoute.get('/',(req, res, next)=>{
    const products = adminData.products;
    res.render('shop',{prods: products, pageTitle : "Shop", path: "/"});
});

module.exports = shopRoute;