const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(shopRoutes);
app.use(adminData.routes);

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000);