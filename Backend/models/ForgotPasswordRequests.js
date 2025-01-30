const Sequelize=require('sequelize');
const sequelize=require('../util/database');


const ForgotPasswordRequest=sequelize.define('ForgotPasswordRequest',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isactive:{
        type:Sequelize.ENUM,
        values:['ACTIVE','NOT'],
        allowNull:false
    }
});

module.exports=ForgotPasswordRequest;