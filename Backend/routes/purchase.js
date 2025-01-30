const express=require('express');
const authenticate = require('../middleware/auth');
const router=express.Router();
const purchaseController=require('../controller/purchaseController')

router.get('/premiummembership',authenticate,purchaseController.premiummembership);
router.post('/premiummembership',authenticate,purchaseController.updateMembership);
router.get('/check',authenticate,purchaseController.checkPremium)
module.exports=router;
 