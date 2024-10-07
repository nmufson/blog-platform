const postController = require('../controllers/postController');
const validators = require('../utils/validators');
const authenticate = require('../middleware/authenticate');
const checkUserCanPost = require('../middleware/checkUserCanPost');
const Router = require('express');

const router = Router();

router.post(
  '/',
  authenticate,
  validators.postValidationRules(),
  checkUserCanPost,
  postController.createPost,
);

router.get('/', postController.getAllPosts);
router.get('/user/:userId', postController.getPostsByUser);
router.get('/post/:postId', postController.getPostById);
router.get('/latest', postController.getLatestPost);

router.put(
  '/post/:postId',
  authenticate,
  validators.postValidationRules(),
  postController.updatePost,
);

router.delete('/post/:postId', authenticate, postController.deletePost);

module.exports = router;
