const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');

const router = express.Router();

router.post('/', addExpense);
router.get('/user/:id', getUserExpenses);
router.get('/all', getOverallExpenses);
router.get('/balance-sheet', downloadBalanceSheet); // Route to download balance sheet

module.exports = router;
