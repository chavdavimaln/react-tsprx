/**
 * UserRegistration.jsx
 * 
 * Backend file for storing and viewing user registration data.
 * This file is for server-side use only - not for frontend display.
 * 
 * Data stored:
 * - User profile information (name, email, mobile, DOB, state)
 * - Authentication data (password - hashed in production)
 * - Partner codes
 * - Account creation timestamps
 * 
 * Usage:
 * - Import this file in server routes to access user data
 * - Use helper functions to read/write user records
 * - Not meant to be rendered as a React component
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');

// Initialize data file if it doesn't exist
const initializeDataFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

// Read all users
const getAllUsers = () => {
  initializeDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

// Get user by ID
const getUserById = (id) => {
  const users = getAllUsers();
  return users.find(user => user.id === id);
};

// Get user by email
const getUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find(user => user.email === email);
};

// Add new user
const addUser = (userData) => {
  const users = getAllUsers();
  
  // Check if email already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: Date.now(),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  
  return newUser;
};

// Update user by ID
const updateUser = (id, userData) => {
  const users = getAllUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    throw new Error('User not found');
  }
  
  users[index] = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  
  return users[index];
};

// Delete user by ID
const deleteUser = (id) => {
  const users = getAllUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) {
    throw new Error('User not found');
  }
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(filteredUsers, null, 2));
  
  return true;
};

// Get users count
const getUsersCount = () => {
  const users = getAllUsers();
  return users.length;
};

// Export functions for use in server routes
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
  getUsersCount,
  DATA_FILE
};

// Note: This is a Node.js module, not a React component
// It should be required/imported in server/index.js or route files
// Example usage in server routes:
//
// const userDB = require('./UserRegistration');
//
// // Get all users (for admin view)
// app.get('/api/admin/users', (req, res) => {
//   const users = userDB.getAllUsers();
//   res.json(users);
// });
//
// // Register new user
// app.post('/api/register', (req, res) => {
//   try {
//     const user = userDB.addUser(req.body);
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// });