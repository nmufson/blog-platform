const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const userServices = require('../services/userServices');

async function checkEmail(req, res) {
  const { email } = req.body;

  const user = await userServices.getUserByEmail(email);
  if (user) {
    return res.status(200).json({ available: true });
  }
  return res.status(200).json({ available: false });
}

async function checkUsername(req, res) {
  const { username } = req.body;

  const user = await userServices.getUserByUsername(username);
  if (user) {
    return res.status(200).json({ available: true });
  }
  return res.status(200).json({ available: false });
}

async function signUpUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password, authorCode } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByEmail = await userServices.getUserByEmail(email);
  if (existingUserByEmail) {
    return res.status(400).json({ message: 'Email already taken' });
  }
  const existingUserByUsername = await userServices.getUserByUsername(username);
  if (existingUserByUsername) {
    return res.status(400).json({ message: 'Username already taken' });
  }
  const canPost = process.env.AUTHOR_CODE === authorCode ? true : false;

  const newUser = await userServices.createUser(
    email,
    username,
    hashedPassword,
    canPost,
  );
  if (!newUser) return res.status(500).send('Error: User could not be created');

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email }, // Payload (user's ID and email)
    process.env.JWT_SECRET, // Secret key for signing the token
    { expiresIn: '1h' }, // Optional: set token expiration time (e.g., 1 hour)
  );

  return res.status(201).json({
    message: 'User created successfully',
    token, // Send the generated JWT
    user: newUser, // You can send back any necessary user info (excluding the password)
  });
}

async function logInUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload: user ID and email
    process.env.JWT_SECRET, // Secret key used for signing the token
    { expiresIn: '1h' }, // Optional: set token expiration time (e.g., 1 hour)
  );

  // Return success response with the JWT
  return res.status(200).json({
    message: 'Login successful',
    token, // JWT returned here
    user: { id: user.id, email: user.email },
  });
}

async function getUser(req, res) {
  const userId = parseInt(req.params.userId, 10);
  const user = await userServices.getUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.status(200).json(user);
}

async function getAllUsers(req, res) {
  const users = await userServices.getAllUsers();

  if (!users) {
    return res.status(404).json({ message: 'No users found.' });
  }

  res.status(200).json({ message: 'Users found', users });
}

module.exports = {
  checkEmail: catchAsync(checkEmail),
  checkUsername: catchAsync(checkUsername),
  logInUser: catchAsync(logInUser),
  signUpUser: catchAsync(signUpUser),
  getUser: catchAsync(getUser),
  getAllUsers: catchAsync(getAllUsers),
};
