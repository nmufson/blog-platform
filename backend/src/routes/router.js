const mainController = require('../controllers/mainController');
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const Router = require('express');

const router = Router();

router.get('/', mainController.getHomePage);
router.get('/about', mainController.getAboutPage);

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
