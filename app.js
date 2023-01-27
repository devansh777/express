const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine", 'ejs');
app.set("views", 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(shopRoutes);
app.use(adminRoutes);

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000);