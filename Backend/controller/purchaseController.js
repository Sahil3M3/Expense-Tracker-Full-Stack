const purchaseOrderService=require('../services/purchaseOrderService')

module.exports.premiummembership = async (req, res, next) => {


  const result=await purchaseOrderService.createOrder(req);

return res.status(result.status).json({ order: result.order, key_id: result.key_id, message: result.message, error: result.error });
  
};

module.exports.updateMembership = async (req, res, next) => {
  const userId = req.user.id;
  const { orderId, msg, paymentId } = req.body;
const result=await purchaseOrderService.updateMembership(userId,orderId,msg,paymentId);

return res.status(result.status).json({ message: result.message, error: result.error });

};

module.exports.checkPremium = (req, res, next) => {
  const { ispremium } = req.user;

  if (ispremium) {
    return res.status(200).json({ check: true });
  } else {
    return res.status(403).json({ check: false });
  }
};
