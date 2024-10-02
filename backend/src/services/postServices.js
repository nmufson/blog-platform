const { PrismaClient } = require('@prisma/client');
const catchQuery = require('../utils/catchQuery');

const prisma = new PrismaClient();

async function createPost(title, content, userId, published) {
  return await catchQuery(async () => {
    return await prisma.post.create({
      data: { title, content, userId, published },
    });
  });
}

async function getAllPosts() {
  return await catchQuery(async () => {
    return await prisma.post.findMany({
      include: {
        user: true, // Include user data if needed
        comments: true, // Include comments if needed
      },
    });
  });
}

// Use the same format for getPostById
async function getPostById(id) {
  return await catchQuery(async () => {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: true, // Include user data if needed
        comments: true, // Include comments if needed
      },
    });
  });
}

// Use the same format for getPostsByUserId
async function getPostsByUserId(userId) {
  return await catchQuery(async () => {
    return await prisma.post.findMany({
      where: { userId },
      include: {
        user: true, // Include user data if needed
        comments: true, // Include comments if needed
      },
    });
  });
}

// Use the same format for deletePost
async function deletePost(id) {
  return await catchQuery(async () => {
    return await prisma.post.delete({
      where: { id },
    });
  });
}

// Use the same format for updatePost
async function updatePost(id, data) {
  return await catchQuery(async () => {
    return await prisma.post.update({
      where: { id },
      data,
    });
  });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUserId,
  getPostById,
  getPostsByUserId,
  deletePost,
  updatePost,
};
