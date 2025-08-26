const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('fontend'));

// MongoDB connection
mongoose.connect('mongodb+srv://bankeaseuser:securepass123@cluster0.vhfztvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB error:', err));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'fontend', 'index.html'));
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  dob: String,
  address: String
});
const User = mongoose.model('User', userSchema);

// Bank Schema
const bankSchema = new mongoose.Schema({
  userId: String,
  bankName: String,
  accountNumber: String,
  accountType: String,
  routingNumber: String,
  balance: Number
});
const Bank = mongoose.model('Bank', bankSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  userId: String,
  description: String,
  category: String,
  account: String,
  amount: Number,
  type: String,
  date: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, 'mybankease2025secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Sign-up
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign-in
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'mybankease2025secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, dob: user.dob, address: user.address } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user profile
app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add bank
app.post('/api/banks', authenticate, async (req, res) => {
  try {
    const { bankName, accountNumber, accountType, routingNumber, balance } = req.body;
    const bank = new Bank({ userId: req.userId, bankName, accountNumber, accountType, routingNumber, balance });
    await bank.save();
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete bank
app.delete('/api/banks/:id', authenticate, async (req, res) => {
  try {
    const bankId = req.params.id;
    
    // Check if the bank exists and belongs to the user
    const bank = await Bank.findOne({ _id: bankId, userId: req.userId });
    
    if (!bank) {
      return res.status(404).json({ error: 'Bank not found or unauthorized' });
    }
    
    await Bank.findByIdAndDelete(bankId);
    res.json({ message: 'Bank deleted successfully' });
  } catch (err) {
    console.error('Error deleting bank:', err);
    res.status(500).json({ error: 'Failed to delete bank' });
  }
});

// Get banks
app.get('/api/banks', authenticate, async (req, res) => {
  try {
    const banks = await Bank.find({ userId: req.userId });
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent transactions
app.get('/api/transactions', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(4);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stats for dashboard
app.get('/api/stats', authenticate, async (req, res) => {
  try {
    const banks = await Bank.find({ userId: req.userId });
    const transactions = await Transaction.find({ userId: req.userId });
    const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const savings = banks
      .filter(b => b.accountType === 'savings')
      .reduce((sum, b) => sum + b.balance, 0);
    res.json({ totalBalance, expenses, savings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${3000}`));