const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
const AWS = require('aws-sdk');
const DownloadHistory = require('../models/downloadhistory');

const uploadToS3 = (data, fileName) => {
  const Bucket_NAME = 'expensetrackerapp7074';
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  const s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  const params = {
    Bucket: Bucket_NAME,
    Key: fileName,
    Body: data,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, s3res) => {
      if (err) {
        console.log("Something went wrong", err);
        reject(err);
      } else {
        console.log("File URL:", s3res.Location);
        resolve(s3res.Location);
      }
    });
  });
};

const getExpenses = async (req) => {
  try {
    const userId=req.user.id;
const page=Number(req.query.page);//1
const limit=Number(req.query.limit);//3

const startIndex=(page-1)*limit;
const endIndex=page * limit;

const totalExpensesCount = await Expense.count({ where: { userId } });

const expenses = await Expense.findAll({ where: { userId }, offset: startIndex, limit: limit });
const expenseData = expenses.map(expense => expense.dataValues);

const response = {
  expenses: expenseData
};

if (endIndex < totalExpensesCount) {
  response.next = {
    page: page + 1,
    limit: limit
  };
}

if (startIndex > 0) {
  response.previous = {
    page: page - 1,
    limit: limit
  };
}
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Error fetching expenses");
  }
};

const addExpense = async (userId, expenseData) => {
  const { expenseAmount, Description, type } = expenseData;
  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t });

    if (!user) {
      await t.rollback();
      throw new Error('User not found');
    }

    user.total_cost = (user.total_cost || 0) + Number(expenseAmount);
    await user.save({ transaction: t });

    const expense = await Expense.create({
      expenseAmount: expenseAmount,
      Description: Description,
      type: type,
      userId: userId
    }, { transaction: t });

    await t.commit();
    return expense;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deleteExpense = async (userId, expenseId) => {
  const t = await sequelize.transaction();

  try {
    const expense = await Expense.findByPk(expenseId, { transaction: t });

    if (!expense) {
      await t.rollback();
      throw new Error("Expense not found");
    }

    const expenseAmount = Number(expense.expenseAmount);
    const user = await User.findByPk(userId, { transaction: t });

    if (!user) {
      await t.rollback();
      throw new Error("User not found");
    }

    user.total_cost -= expenseAmount;
    await user.save({ transaction: t });

    await expense.destroy({ transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const updateExpense = async (userId, expenseId, expenseData) => {
  const { expenseAmount, Description, type } = expenseData;
  const t = await sequelize.transaction();

  try {
    const expense = await Expense.findByPk(expenseId, { transaction: t });

    if (!expense) {
      await t.rollback();
      throw new Error("Expense not found");
    }

    const oldExpenseAmount = Number(expense.expenseAmount);
    expense.expenseAmount = expenseAmount;
    expense.Description = Description;
    expense.type = type;
    await expense.save({ transaction: t });

    const user = await User.findByPk(userId, { transaction: t });

    if (!user) {
      await t.rollback();
      throw new Error("User not found");
    }

    user.total_cost -= oldExpenseAmount;
    user.total_cost += Number(expenseAmount);
    await user.save({ transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const downloadExpense = async (userId) => {
  const t = await sequelize.transaction();
  try {
    const expense = await Expense.findAll({ where: { userId: userId } });
    const stringifiedExpense = JSON.stringify(expense);
    
    const fileName = `Expense${userId}/${new Date().toISOString()}.txt`;
    const fileUrl = await uploadToS3(stringifiedExpense, fileName);

    if (!fileUrl) {
      throw new Error("File URL not found after upload");
    }

    const downloadhistory = {
      link: fileUrl,
      userId: userId,
    };

    const id = await DownloadHistory.create(downloadhistory, { transaction: t });

    if (id) {
      await t.commit();
    } else {
      await t.rollback();
    }

    return fileUrl;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  downloadExpense
};
