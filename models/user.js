const Sequilise = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id:{
        type:Sequilise.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequilise.STRING
    },
    email:{
        type:Sequilise.STRING,
        allowNull:false
    }
});

module.exports = User;