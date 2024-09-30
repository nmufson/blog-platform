const commentController = require('../controllers/commentController');
const validators = require('../utils/validators');
const Router = require('express');

const router = Router();

router.post(
  '/',
  validators.commentValidationRules,
  commentController.createComment,
);

router.get('/:postId', commentController.getCommentsByPost);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
