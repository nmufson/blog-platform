const commentServices = require('../services/commentServices');
const catchAsync = require('../utils/catchAsync');

async function createComment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { content, userId } = req.body;

  const newComment = await commentServices.createComment({ content, userId });

  res.status(201).json(newComment);
}

async function getCommentsByPost(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const comments = await postServices.getCommentsByPostId(postId);

  if (!comments.length) {
    return res.status(404).json({ message: 'No posts found.' });
  }

  res.status(200).json(comments);
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  const deletedComment = await commentServices.deleteComment(commentId);

  if (!deletedComment) {
    return res.status(404).json({ message: 'Post not found' });
  }

  return res.status(200).json(deletedPost);
}

// prob dont need a getCommentsByUser

module.exports = {
  createComment: catchAsync(createComment),
  getCommentsByPost: catchAsync(getCommentsByPost),
  deleteComment: catchAsync(deleteComment),
};
