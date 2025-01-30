const User=require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const sequelize = require('../util/database');

module.exports.createUser=async(req)=>{

    const{email,phone,password,name}=req.body;
    const salt=5;
const t=await sequelize.transaction();

try {
    const hash = await bcrypt.hash(password,salt);
    const user={
        email:email,
        password:hash,
           };
           await User.create(user,{transaction:t});
           await t.commit();

           return {status:201,message:"User is Added"};
}
catch(e)
{
await t.rollback();
return { status: 409, error: e.message };

}
}

module.exports.loginUser=async(email, password)=>{

    const t=await sequelize.transaction();

try
{
    const user=await User.findOne({where:{email:email}})

    if(!user)
    return{status:404,message:"User Not Found"};
    
    const isValid=await bcrypt.compare(password,user.password);

    if(isValid)
    {
        return { status: 200, message: "Login successful", token: generateToken(user.id) };
    }
    else
    {
        return { status: 401, message: "Password is Wrong" };
    }
}
catch(e)
{
    return { status: 500, message: "Server went down", error: e.message };
}

} 

function generateToken(id) {
    const key = "Your_Key";

    return jwt.sign({ userId: id }, key);
}
