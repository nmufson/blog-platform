const postServices = require('../services/postServices');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');

async function createPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, content, userId, publish, imageURL } = req.body;

  const newPost = await postServices.createPost(
    title,
    content,
    userId,
    publish,
    imageURL || null,
  );

  res.status(201).json({ message: 'Post created successfully', newPost });
}

async function getAllPosts(req, res) {
  const posts = await postServices.getAllPosts();

  if (!posts.length) {
    return res.status(404).json({ message: 'No posts found.' });
  }

  res.status(200).json({ message: 'Posts returned successfully', posts });
}

async function getPostsByUser(req, res) {
  const userId = parseInt(req.params.userId, 10); // Get userId from route parameters
  const posts = await postServices.getPostsByUserId(userId); // Call the service function

  if (!posts.length) {
    return res.status(404).json({ message: 'No posts found for this user.' });
  }

  res.status(200).json({ message: 'Posts returned successfully', posts });
}

async function getLatestPost(req, res) {
  const latestPost = await postServices.getLatestPost();
  if (!latestPost) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  res.status(200).json({ message: 'Post returned successfully', latestPost });
}

async function getPostById(req, res) {
  const postId = parseInt(req.params.postId, 10); // Get postId from route parameters
  const post = await postServices.getPostById(postId); // Call the service function

  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  res.status(200).json({ message: 'Post found successfully', post });
}

async function updatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = parseInt(req.params.postId, 10);
  const { title, content, published } = req.body;
  const userId = req.user.id;

  const post = await postServices.getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to update this post' });
  }

  const updatedPost = await postServices.updatePost(postId, {
    title,
    content,
    published,
  });
  return res
    .status(200)
    .json({ message: 'Message updated successfully.', updatedPost });
}

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId, 10);
  const userId = req.user.id;
  const post = await postServices.getPostById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to delete this post' });
  }

  await postServices.deletePost(postId);

  return res.status(200).json({ message: 'Post deleted successfully.' });
}

module.exports = {
  createPost: catchAsync(createPost),
  getAllPosts: catchAsync(getAllPosts),
  getPostsByUser: catchAsync(getPostsByUser),
  getLatestPost: catchAsync(getLatestPost),
  getPostById: catchAsync(getPostById),
  updatePost: catchAsync(updatePost),
  deletePost: catchAsync(deletePost),
};
