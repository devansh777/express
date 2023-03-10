const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();
app.set("view engine", 'ejs');
app.set("views", 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

/* db.execute('select * from products').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
}); */

app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        console.log(err)
    });
});
app.use(express.static(path.join(__dirname,'public')));
app.use(shopRoutes);
app.use(adminRoutes);
app.use(authRoutes);

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>");
});

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

//sequelize.sync({force:true}).then(result=>{
sequelize.sync().then(result=>{
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({
            name:'devansh',
            email:'devansh@gmail.com'
        });
    }
    return user;
})
.then(user=>{
    return user.createCart();
})
.then(user=>{
    //console.log(user);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});
