const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { catchQuery } = require('../utils/catchQuery');

const createComment = catchQuery(async (data) => {
  return await prisma.user.create({ data });
});

const getCommentById = catchQuery(async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

const deleteComment = catchQuery(async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
});

const updateComment = catchQuery(async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
});

module.exports = {
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
};
