const { body } = require('express-validator');
const userServices = require('../services/userServices');
const { postServices } = require('../services/postServices');
const { commentServices } = require('../services/commentServices');

const signUpValidationRules = () => [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .escape()
    .custom(async (email) => {
      const existingUser = await userServices.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username cannot be blank')
    .isLength({ min: 3, max: 15 })
    .withMessage('Username must be between 3 and 15 characters long')
    .escape()
    .custom(async (username) => {
      const existingUser = await userServices.getUserByUsername(username);
      if (existingUser) {
        throw new Error('Username already in use');
      }
    }),
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
    .withMessage('Password must contain a special character')
    .escape(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

const logInValidationRules = () => [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .escape(),
  body('password').notEmpty().withMessage('Password cannot be empty').escape(),
];

const postValidationRules = () => [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title cannot be blank')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters')
    .escape(),
  body('content').trim().notEmpty().withMessage('Post content cannot be empty'),
  body('imageURL').optional(),
  body('imageAltText').optional(),
];

const commentValidationRules = () => [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Message cannot be longer than 500 characters')
    .escape(),
];

module.exports = {
  signUpValidationRules,
  logInValidationRules,
  postValidationRules,
  commentValidationRules,
};
