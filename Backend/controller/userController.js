
const userService=require('../services/userService')

module.exports.postUser=async (req,res,next)=>{

    const result=await userService.createUser(req);

    return res.status(result.status).json({ message: result.message, error: result.error });
   
}

module.exports.loginUser=async(req,res,next)=>{
   
    const { email, password } = req.body;
   

    const result = await userService.loginUser(email, password);
    return res.status(result.status).json({ message: result.message, token: result.token, error: result.error });
};

module.exports.updateUser=async(req,res,next)=>{
        
const result=await userService.updateUser(req);
console.log(result);


 return res.status(result.status).json({ message: result.message, error: result.error });
    
}
module.exports.getUser=async(req,res)=>{
const {name,photoUrl}=req.user;

res.status(200).json({data:{name,photoUrl}});

}

