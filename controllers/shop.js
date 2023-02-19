const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

exports.getProducts = (req, res, next)=>{
    Product.findAll().then(products=>{
        res.render(
            'shop/product-list',{
                prods: products,
                pageTitle : "All Products",
                path: "/products"
            }
        );
    }).catch(err=>{
        console.log(err)
    });
};

exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId;
    console.log(prodId);
    /* Product.findAll({where:{id:prodId}}).then(product=>{
        res.render('shop/product-details',{
            product : product[0],
            pageTitle : product[0].title,
            path : '/products'
        });
    }).catch(err=>{
        console.log(err);
    }) */
    Product.findByPk(prodId)
        .then(product=>{
            res.render('shop/product-details',{
                product : product,
                pageTitle : product.title,
                path : '/products'
            });
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getIndex = (req,res,next)=>{
    Product.findAll().then(products=>{
        res.render(
            'shop/product-list',{
                prods: products,
                pageTitle : "All Products",
                path: "/",
                isAuthenticated:req.isLoggenIn
            }
        );
    }).catch(err=>{
        console.log(err)
    });
};

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId;
    let fetchCart;
    let newQty = 1;
    req.user.getCart().then(cart=>{
        fetchCart = cart;
        return cart.getProducts({where:{id:prodId}});
    })
    .then(products=>{
        let product;
        if(products.length > 0){
            product = products[0];

        }
        if(product){
            const oldQty = product.cartItem.qty;
            newQty = oldQty + 1;
            return product;
        }
        return Product.findByPk(prodId);
    })
    .then(product=>{
        return fetchCart.addProduct(product,{through:{qty:newQty}});
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>{console.log(err)});
};

exports.getOrders = (req,res,next)=>{
    req.user.getOrders({include:['products']}).then(orders=>{
        res.render(
            'shop/orders',{
                pageTitle : "Orders",
                path: "/orders",
                orders:orders
            }
        );
    }).catch(err=>{
        console.log(err)
    })
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts().then(product=>{
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: product
            });
        });
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:prodId}});
    })
    .then(products=>{
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        res.redirect('/cart');  
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.postOrder = (req,res,next)=>{
    let fetchCart;
    req.user.getCart().then(cart=>{
        fetchCart = cart;
        return cart.getProducts();
    })
    .then(products=>{
        return req.user.createOrder()
        .then(order=>{
            return order.addProducts(
                products.map(product=>{
                    console.log(product.cartItem.qty);
                    product.orderItem = {qty:product.cartItem.qty};
                    console.log(product.orderItem);
                    return product;
                })
            );
        })
        .catch(err=>{console.log(err)});
    })
    .then(result=>{
        return fetchCart.setProducts(null);
    })
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>{
        console.log(err);
    });
};