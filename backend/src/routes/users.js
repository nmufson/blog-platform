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
  '/sign-up',
  validators.signUpValidationRules(),
  userController.signUpUser,
);

router.post(
  '/log-in',
  validators.logInValidationRules(),
  userController.logInUser,
);

router.get('/', authenticate, userController.getAllUsers);
router.get('/:userId', authenticate, userController.getUser);

module.exports = router;
