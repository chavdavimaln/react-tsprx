const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

// Import user registration data handler
const userDB = require('./UserRegistration');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ============================================
// USER REGISTRATION API ROUTES
// ============================================

// Get all users (for admin view only)
app.get('/api/admin/users', (req, res) => {
  try {
    const users = userDB.getAllUsers();
    // Remove passwords from response for security
    const safeUsers = users.map(({ password, ...rest }) => rest);
    res.json({ success: true, users: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register new user
app.post('/api/register', (req, res) => {
  try {
    const { firstName, lastName, email, mobile, dob, state, password, partnerCode } = req.body;
    
    const newUser = userDB.addUser({
      firstName,
      lastName,
      email,
      mobile,
      dob,
      state,
      password, // Note: In production, hash the password before storing
      partnerCode
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// User login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = userDB.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email not registered' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const user = userDB.getUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const user = userDB.updateUser(parseInt(req.params.id), req.body);
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    userDB.deleteUser(parseInt(req.params.id));
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get users count
app.get('/api/users/count', (req, res) => {
  try {
    const count = userDB.getUsersCount();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// EMAIL SENDING API (Existing)
// ============================================

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  console.log('SMTP Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
  });

  // Configure your SMTP transporter
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
  });

  try {
    // Verify SMTP connection
    await transporter.verify();
    console.log('SMTP Connected successfully');

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent to:', to);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
