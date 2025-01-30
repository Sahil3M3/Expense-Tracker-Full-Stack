const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
const AWS = require('aws-sdk');
const DownloadHistory = require('../models/downloadhistory'); // Ensure this import is present
const expenseService = require('../services/expenseService');

// Get all expenses for the current user
module.exports.getExpense = async (req, res, next) => {
  try {
    
    const expenses = await expenseService.getExpenses(req);
    
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Add a new expense
module.exports.addExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.addExpense(req.user.id, req.body);
    res.status(201).json({ id: expense.id });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Delete an expense
module.exports.deleteExpense = async (req, res, next) => {
  try {
    await expenseService.deleteExpense(req.user.id, req.params.id);
    res.status(203).json({ msg: "Expense removed successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ msg: "An error occurred while deleting the expense" });
  }
};

// Update an expense
module.exports.putExpense = async (req, res, next) => {
  try {
    await expenseService.updateExpense(req.user.id, req.params.id, req.body);
    res.status(203).json({ msg: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ msg: "An error occurred while updating the expense" });
  }
};

// Show leaderboard
module.exports.showLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await User.findAll({
      attributes: ['id', 'name', 'total_cost'],
      order: [['total_cost', 'DESC']]
    });
    return res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error fetching top users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Download expenses for the current user
module.exports.downloadExpense = async (req, res, next) => {
  try {
    const fileUrl = await expenseService.downloadExpense(req.user.id);
    res.status(200).json({ fileUrl, success: true });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get download history for the current user
module.exports.getDownload = async (req, res, next) => {
  try {
    const links = await DownloadHistory.findAll({ where: { userId: req.user.id } });
    res.status(200).send(JSON.stringify(links));
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
