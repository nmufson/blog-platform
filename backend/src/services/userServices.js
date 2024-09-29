const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { catchQuery } = require('../utils/catchQuery');

const createUser = catchQuery(async (data) => {
  return await prisma.user.create({ data });
});

const getUserById = catchQuery(async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

const getUserByEmail = catchQuery(async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
});

const deleteUser = catchQuery(async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
});

const updateUser = catchQuery(async (id, data) => {
  return await prisma.user.update({
    where: { id },
    // data is object containing only those fields we want to update
    data,
  });
});

// Export the wrapped function
module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUser,
};
