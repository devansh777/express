const path = require('path');
const { Router } = require("express");
const express = require("express");
const rootPath = require('../util/path');
const router = express.Router();
const products = [];
router.get('/add-product',(req, res, next)=>{
    res.render('add-product',{pageTitle : "Add Product", path:'/add-product'});
});

router.post('/add-product',(req, res)=>{
    products.push({title:req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
