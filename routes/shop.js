const path = require('path');
const express = require('express');
const adminData = require('./admin');
const rootPath = require('../util/path');
const shopRoute = express.Router();

shopRoute.get('/',(req, res, next)=>{
    console.log(adminData.products);
    res.sendFile(path.join(rootPath,'views','shop.html'));
});

module.exports = shopRoute;