const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

exports.addExpense = async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { payerId, totalAmount, splitMethod, participants } = req.body;

    // Ensure all required fields are provided
    if (!payerId || !totalAmount || !splitMethod || !participants || participants.length === 0) {
      return res.status(400).send({ message: 'All fields are required, including participants' });
    }

    // Handle different split methods
    if (splitMethod === 'equal') {
      // Equal split: divide the total amount equally among all participants
      const amountPerParticipant = totalAmount / participants.length;
      participants.forEach((p) => {
        p.amount = amountPerParticipant;
      });

    } else if (splitMethod === 'exact') {
      // Exact split: ensure all amounts are provided and add up to the total amount
      const totalProvidedAmount = participants.reduce((sum, p) => sum + p.amount, 0);
      if (totalProvidedAmount !== totalAmount) {
        return res.status(400).send({ message: 'Exact amounts must add up to the total amount' });
      }

    } else if (splitMethod === 'percentage') {
      // Percentage split: ensure all percentages add up to 100% and calculate amounts
      const totalPercentage = participants.reduce((sum, p) => sum + p.amount, 0);
      if (totalPercentage !== 100) {
        return res.status(400).send({ message: 'Total percentage must equal 100%' });
      }
      participants.forEach((p) => {
        p.amount = (p.amount / 100) * totalAmount;
      });

    } else {
      return res.status(400).send({ message: 'Invalid split method. Must be "equal", "exact", or "percentage"' });
    }

    // Create the new expense document
    const newExpense = new Expense({
      payerId,
      totalAmount,
      splitMethod,
      participants
    });

    await newExpense.save();

    res.status(201).send({ message: 'Expense added successfully', expenseId: newExpense._id });
  } catch (error) {
    console.error('Error in adding expense:', error);
    res.status(500).send({ message: 'Server error' });
  }
};


// Fetch user expenses
exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.userId': req.params.id });
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

// Fetch overall expenses
exports.getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

// Generate and download balance sheet
exports.downloadBalanceSheet = async (req, res) => {
  try {
    // Fetch all expenses
    console.log("here")
    const expenses = await Expense.find({}).populate();
console.log(expenses);


    console.log("here")
    // Prepare data for the balance sheet
    const balanceData = expenses.map(expense => {
      const payer = expense.payerId.name;
      const totalAmount = expense.totalAmount;
      const splitMethod = expense.splitMethod;
      const participants = expense.participants.map(p => ({
        user: p.userId.name,
        amount: p.amount
      }));
      
      return {
        Payer: payer,
        'Total Amount': totalAmount,
        'Split Method': splitMethod,
        Participants: participants.map(p => `${p.user} owes ${p.amount}`).join(', ')
      };
    });

    // Convert the data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(balanceData);

    // Save CSV file temporarily
    const filePath = path.join(__dirname, '../../balance-sheets', 'balance-sheet.csv');
    fs.writeFileSync(filePath, csv);

    // Send file for download
    res.download(filePath, 'balance-sheet.csv', (err) => {
      if (err) {
        console.error('File download error:', err);
      }

      // Remove file after sending to client
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
