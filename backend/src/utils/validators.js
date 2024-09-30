const { body } = require('express-validator');
const { userServices } = require('../services/userServices');
const { postServices } = require('../services/postServices');
const { commentServices } = require('../services/commentServices');

const userValidationRules = () => [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom(async (email) => {
      const existingUser = await userServices.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  body('username').trim().notEmpty().withMessage('Username cannot be blank'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[@$!%*?&#]/)
    .withMessage('Password must contain a special character'),
  // body('confirmPassword').custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error('Password confirmation does not match password');
  //   }
  //   return true;
  // }),
];

const postValidationRules = () => [
  body('post').trim().notEmpty().withMessage('Message cannot be empty'),
];

const commentValidationRules = () => [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Message cannot be longer than 500 characters'),
];

module.exports = {
  userValidationRules,
  postValidationRules,
  commentValidationRules,
};
