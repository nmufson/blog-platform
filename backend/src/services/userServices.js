const { PrismaClient } = require('@prisma/client');
const catchQuery = require('../utils/catchQuery');

const prisma = new PrismaClient();

async function createUser(email, username, hashedPassword, canPost) {
  return await catchQuery(async () => {
    return await prisma.user.create({
      data: {
        email, // email should come from the argument
        username, // username should come from the argument
        password: hashedPassword,
        canPost,
      },
    });
  });
}

async function getAllUsers() {
  return await catchQuery(async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        canPost: true,
      },
    });
  });
}

// Get a user by ID with error handling
async function getUserById(id) {
  return await catchQuery(async () => {
    return await prisma.user.findUnique({
      where: { id },
    });
  });
}

// Get a user by email with error handling
async function getUserByEmail(email) {
  return await catchQuery(async () => {
    return await prisma.user.findUnique({
      where: { email },
    });
  });
}

async function getUserByUsername(username) {
  return await catchQuery(async () => {
    return await prisma.user.findUnique({
      where: { username },
    });
  });
}

// Update a user with error handling
async function updateUser(id, data) {
  return await catchQuery(async () => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  });
}

// Export the wrapped function
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
};
