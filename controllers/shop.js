const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next)=>{
    Product.fetchAll().then(([rows,fielddata])=>{
        res.render(
            'shop/product-list',{
                prods: rows,
                pageTitle : "All Products",
                path: "/products"
            }
        );
    }).catch(err => {
        console.log(err)
    });
};

exports.getProduct = (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id).then(([product])=>{
        res.render('shop/product-details',{
            product : product[0],
            pageTitle : product[0].title,
            path : '/products'
        });
    }).catch(err=>{
        console.log(err);
    }); 
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll().then(([rows,fieldData])=>{
        res.render('shop/index',{
            prods: rows,
            pageTitle : "Shop",
            path: "/"
        }
    );
    })
    .catch(err => console.log(err));
};

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId,product =>{
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
};

exports.getOrders = (req,res,next)=>{
    res.render(
        'shop/orders',{
            pageTitle : "Orders",
            path: "/orders"
        }
    );
};

exports.getCheckout = (req,res,next)=>{
    res.render(
        'shop/checkout',{
            pageTitle : "Checkout",
            path: "/checkout"
        }
    );
}; 

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
          const cartProducts = [];
          for (product of products) {
            if(cart){
                const cartProductData = cart.products.find(
                  prod => prod.id === product.id
                );
                if (cartProductData) {
                  cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
          }
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
          });
        });
      });
  };

  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    });
  };