const commentController = require('../controllers/commentController');
const validators = require('../utils/validators');
const authenticate = require('../middleware/authenticate');
const Router = require('express');

const router = Router();

router.post(
  '/post/:postId',
  authenticate,
  validators.commentValidationRules(),
  commentController.createComment,
);

router.get('/post/:postId', authenticate, commentController.getCommentsByPost);

router.delete('/:commentId', authenticate, commentController.deleteComment);

module.exports = router;
