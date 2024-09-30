const userController = require('../controllers/userController');
const validators = require('../utils/validators');
const Router = require('express');

const router = Router();

router.post('/', userController.createUser);

router.get('/:userId', userController.getUser);

module.exports = router;
