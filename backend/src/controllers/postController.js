const postServices = require('../services/postServices');
const catchAsync = require('../utils/catchAsync');
const { postValidationRules } = require('../utils/validators');
const { validationResult } = require('express-validator');

async function createPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, content, userId } = req.body;

  const newPost = await postServices.createPost({ title, content, userId });

  res.status(201).json(newPost);
}

async function getAllPosts(req, res) {
  const posts = await postServices.getAllPosts();

  if (!posts.length) {
    return res.status(404).json({ message: 'No posts found.' });
  }

  res.status(200).json(posts);
}

async function getPostsByUser(req, res) {
  const userId = parseInt(req.params.userId, 10); // Get userId from route parameters
  const posts = await postServices.getPostsByUserId(userId); // Call the service function

  if (!posts.length) {
    return res.status(404).json({ message: 'No posts found for this user.' });
  }

  res.status(200).json(posts);
}

async function updatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = parseInt(req.params.postId, 10);
  const { title, content } = req.body;

  const updatedPost = await postServices.updatePost(postId, { title, content });
  return res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  const deletedPost = await postServices.deletePost(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  return res.status(200).json(deletedPost);
}

module.exports = {
  createPost: catchAsync(createPost),
  getAllPosts: catchAsync(getAllPosts),
  getPostsByUser: catchAsync(getPostsByUser),
  updatePost: catchAsync(updatePost),
  deletePost: catchAsync(deletePost),
};
