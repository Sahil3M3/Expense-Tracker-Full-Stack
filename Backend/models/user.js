const Sequelize=require("sequelize");
const sequelize=require('../util/database');

const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    total_cost:{
      type:Sequelize.BIGINT,
      allowNull:true
    }
    ,
    photoUrl:{
      type:Sequelize.STRING,
      allowNull:true
    }
    ,
    name:{
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ispremium:{
     type: Sequelize.BOOLEAN,
      allowNull:true
    }

  });
module.exports=User;
