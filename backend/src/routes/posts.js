const postController = require('../controllers/postController');
const validators = require('../utils/validators');
const Router = require('express');

const router = Router();

router.post('/', validators.postValidationRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:userId', postController.getPostsByUser);

router.put(
  '/:postId',
  validators.postValidationRules,
  postController.updatePost,
);

router.delete('/:postId', postController.deletePost);

module.exports = router;
