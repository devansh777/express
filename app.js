const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');

const app = express();
app.set("view engine", 'ejs');
app.set("views", 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* db.execute('select * from products').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
}); */

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(shopRoutes);
app.use(adminRoutes);

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000);