const { Router } = require('express');
const controller = require('../controllers/controller');

const router = Router();

router.get('/api/home', controller.getHomePage);

module.exports = router;
