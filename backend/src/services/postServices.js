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
        comments: {
          include: {
            user: {
              select: { username: true }, // Only select the username field
            },
          },
          orderBy: {
            timestamp: 'desc', // Sort comments by descending timestamp
          },
        }, // Include comments if needed
      },
      orderBy: {
        timestamp: 'desc', // Sort posts by descending timestamp
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
        user: true, // Include user data for the post itself
        comments: {
          include: {
            user: {
              select: { username: true }, // Only select the username field
            },
          },
        },
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

async function getLatestPost() {
  return await catchQuery(async () => {
    return await prisma.post.findFirst({
      orderBy: {
        timestamp: 'desc',
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
  getLatestPost,
  deletePost,
  updatePost,
};
