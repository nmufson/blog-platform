const userController = require('../controllers/userController');
const validators = require('../utils/validators');
const Router = require('express');
const authenticate = require('../middleware/authenticate');

const router = Router();

// validation rules needs to be invoked because it passes the errors array
// for our route, we want the error array, not the func itself]
// express-validator modifies the req object by adding validation
// errors to it

router.post(
  '/signup',
  validators.signUpValidationRules(),
  userController.signUpUser,
);

router.post(
  '/login',
  validators.logInValidationRules(),
  userController.logInUser,
);

router.get('/', userController.getAllUsers);
router.get('/user/:userId', authenticate, userController.getUser);

router.post('/check-email', userController.checkEmail);
router.post('/check-username', userController.checkUsername);

module.exports = router;
