const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  amount: { type: Number, required: true }
});

const expenseSchema = new mongoose.Schema({
  payerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  totalAmount: { type: Number, required: true },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  participants: [participantSchema]
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
