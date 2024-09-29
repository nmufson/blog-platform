const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { catchQuery } = require('../utils/catchQuery');

const createPost = catchQuery(async (data) => {
  return await prisma.user.create({ data });
});

const getPostById = catchQuery(async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

const getPostByUserId

const deletePost = catchQuery(async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
});

const updatePost = catchQuery(async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
});

module.exports = {
  createPost,
  getPostById,
  deletePost,
  updatePost,
};
