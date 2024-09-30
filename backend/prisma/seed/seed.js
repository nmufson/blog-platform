const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log(`Existing data deleted!`);

  const usersData = [
    {
      email: 'alice@example.com',
      username: 'alice',
      password: 'password123',
      canPost: true,
    },
    {
      email: 'bob@example.com',
      username: 'bob',
      password: 'password456',
      canPost: true,
    },
    {
      email: 'charlie@example.com',
      username: 'charlie',
      password: 'password789',
      canPost: false,
    },
  ];

  // Insert multiple users using createMany
  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });
  console.log(`Users created!`);

  // Find all users (so we can use their IDs for posts)
  const allUsers = await prisma.user.findMany();

  // Hardcoded data for posts (each associated with a specific user)
  const postsData = [
    {
      title: 'Alice’s First Post',
      content: 'This is Alice’s first post.',
      userId: allUsers[0].id,
      published: true,
      timestamp: new Date(),
    },
    {
      title: 'Bob’s First Post',
      content: 'This is Bob’s first post.',
      userId: allUsers[1].id,
      published: true,
      timestamp: new Date(),
    },
    {
      title: 'Alice’s Second Post',
      content: 'This is Alice’s second post.',
      userId: allUsers[0].id,
      published: false,
      timestamp: new Date(),
    },
  ];

  // Insert multiple posts using createMany
  await prisma.post.createMany({
    data: postsData,
    skipDuplicates: true,
  });
  console.log(`Posts created!`);

  // Find all posts (so we can use their IDs for comments)
  const allPosts = await prisma.post.findMany();

  // Hardcoded data for comments (each associated with a specific user and post)
  const commentsData = [
    {
      content: 'Great post!',
      userId: allUsers[1].id,
      postId: allPosts[0].id,
      timestamp: new Date(),
    },
    {
      content: 'I agree with this.',
      userId: allUsers[2].id,
      postId: allPosts[1].id,
      timestamp: new Date(),
    },
    {
      content: 'Interesting perspective.',
      userId: allUsers[0].id,
      postId: allPosts[1].id,
      timestamp: new Date(),
    },
    {
      content: 'Thanks for sharing!',
      userId: allUsers[1].id,
      postId: allPosts[2].id,
      timestamp: new Date(),
    },
  ];

  // Insert multiple comments using createMany
  await prisma.comment.createMany({
    data: commentsData,
    skipDuplicates: true,
  });
  console.log(`Comments created!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
