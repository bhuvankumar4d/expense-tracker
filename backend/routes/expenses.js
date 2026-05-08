const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');

// Middleware - verify token on every request
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all expenses for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD new expense
router.post('/', auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = new Expense({
      user: req.userId,
      title,
      amount,
      category,
      date
    });
    await expense.save();
    res.status(201).json(expense);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Make sure user owns this expense
    if (expense.user.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;