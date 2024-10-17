const commentServices = require('../services/commentServices');
const postServices = require('../services/postServices');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');

async function createComment(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { comment, userId } = req.body;

  const newComment = await commentServices.createComment(
    comment,
    userId,
    postId,
  );

  res.status(201).json({ message: 'Comment created successfully', newComment });
}

async function getCommentsByPost(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentServices.getCommentsByPostId(postId);

  if (!comments.length) {
    return res.status(404).json({ message: 'No posts found.' });
  }

  res.status(200).json({ message: 'Comments returned successfully', comments });
}

async function deleteComment(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const commentId = parseInt(req.params.commentId, 10);
  const userId = req.user.id;
  const comment = await commentServices.getCommentById(commentId);
  const post = await postServices.getPostById(postId);

  if (!comment) {
    return res.status(404).json({ message: 'comment not found' });
  }
  if (comment.userId !== userId && post.userId !== userId) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to delete this comment' });
  }

  await commentServices.deleteComment(commentId);

  return res
    .status(200)
    .json({ message: 'Comment deleted successfully', comment });
}

// prob dont need a getCommentsByUser

module.exports = {
  createComment: catchAsync(createComment),
  getCommentsByPost: catchAsync(getCommentsByPost),
  deleteComment: catchAsync(deleteComment),
};
