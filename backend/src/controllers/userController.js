const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const userServices = require('../services/userServices');

async function createUser(req, res) {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  console.log('ts');
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Call the user service to create the user
  const newUser = await userServices.createUser({
    email,
    username,
    hashedPassword,
  });
  if (!newUser) return res.status(500).send('Error: User could not be created');

  // Return success response
  return res.status(201).json({
    message: 'User created successfully',
    newUser,
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

module.exports = {
  createUser: catchAsync(createUser),
  getUser: catchAsync(getUser),
};
