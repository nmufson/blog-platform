const { PrismaClient } = require('@prisma/client');
const catchQuery = require('../utils/catchQuery');

const prisma = new PrismaClient();

async function createComment(content, userId, postId) {
  return await catchQuery(async () => {
    return await prisma.comment.create({
      data: { content, userId, postId },
      include: {
        user: true, // Include user data with the created comment
      },
    });
  });
}

async function getCommentById(id) {
  return await catchQuery(async () => {
    return await prisma.comment.findUnique({
      where: { id },
    });
  });
}

// Get comments by post ID with error handling
async function getCommentsByPostId(postId) {
  return await catchQuery(async () => {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });
  });
}

// Get comments by user ID with error handling
async function getCommentsByUserId(userId) {
  return await catchQuery(async () => {
    return await prisma.comment.findMany({
      where: {
        userId: userId,
      },
    });
  });
}

// Delete a comment with error handling
async function deleteComment(id) {
  return await catchQuery(async () => {
    return await prisma.comment.delete({
      where: {
        id, // Use the passed id to delete the correct comment
      },
    });
  });
}

module.exports = {
  createComment,
  getCommentById,
  getCommentsByPostId,
  getCommentsByUserId,
  deleteComment,
};
