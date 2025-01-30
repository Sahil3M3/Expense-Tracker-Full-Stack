const User = require('../models/user');
const Order = require('../models/order');
const Razorpay = require('razorpay');
const sequelize = require('../util/database');

module.exports.createOrder=async(req)=>{
    const userId = req.user.id;
const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const rzp = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
  });

  const amount = 100; // Amount in paise (1 INR = 100 paise)
  const t = await sequelize.transaction();

  try {
    const order = await rzp.orders.create({ amount, currency: 'INR' });

    try {
      const userOrder = await req.user.createOrder({ orderId: order.id, status: "PENDING" }, { transaction: t });

      await t.commit();
      return { status: 201, order, key_id: rzp.key_id };
    }
     catch (err) {
      await t.rollback();
      return { status: 500, message: 'Database entry failed', error: err.message };
    }
  } catch (err) {
    await t.rollback();
    return { status: 500, message: 'Order creation failed', error: JSON.stringify(err) };
}
}

module.exports.updateMembership=async (userId,orderId,msg,paymentId)=>{

    
  const t = await sequelize.transaction();

  try {
    if (msg === 'cancel' || msg === 'failed') {
      const order = await Order.findOne({ where: { orderId: orderId } });

      if (!order) {
        await t.rollback();
        return { status: 404, message: 'Order not found' };
      }

      order.status = "FAILED";
      await order.save({ transaction: t });

      await t.commit();
      return { status: 200, message: 'Order status updated to FAILED' };
    } else {
      const user = await User.findByPk(userId, { transaction: t });

      if (!user) {
        await t.rollback();
        return { status: 404, message: 'User not found' };
      }

      user.ispremium = true;
      await user.save({ transaction: t });

      const order = await Order.findOne({ where: { orderId: orderId }, transaction: t });

      if (!order) {
        await t.rollback();
        return { status: 404, message: 'Order not found' };
      }

      order.status = "COMPLETED";
      order.paymentId = paymentId;
      await order.save({ transaction: t });

      await t.commit();
      return { status: 200, message: 'Membership updated to premium' };
    }
  } catch (error) {
    await t.rollback();
    console.error(error);
    return { status: 500, message: 'Internal server error', error: error.message };
  }
}