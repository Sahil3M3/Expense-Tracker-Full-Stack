const passwordService=require('../services/passwordService');

module.exports.forgotPassword = async(req,res)=>{
  
   const result=await passwordService.sendPasswordResetEmail(req);

   return res.status(result.status).json({ message: result.message, error: result.error });
}

module.exports.resetPassword=async (req,res,next)=>{
   const result=await passwordService.resetPassword(req);

   return res.status(result.status).json({ message: result.message, error: result.error }); 
}