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
      content:
        'Welcome to my blog! I’m thrilled to share my thoughts and experiences with you all. As a newcomer to the blogging world, I want to create a space where I can express my ideas, share my creativity, and connect with like-minded individuals. Today, I want to talk about the journey of starting something new. It can be daunting, filled with self-doubt and uncertainty, but it’s also incredibly rewarding. Each day brings new challenges and learning opportunities that help us grow. Through this blog, I hope to inspire others to embrace their passions and take the leap into the unknown. I’ll be writing about various topics, including travel, lifestyle, and personal growth. I’m excited to share my adventures and insights along the way. So stay tuned for more posts, and feel free to leave your comments and feedback! I’m eager to hear from you and learn together as we embark on this exciting journey.',
      userId: allUsers[0].id,
      published: true,
      timestamp: new Date(),
    },
    {
      title: 'Bob’s First Post',
      content:
        'Hey everyone, Bob here! I’m excited to kick off my blogging journey with you. In this first post, I’d like to introduce myself and share what you can expect from my blog. I’ve always had a passion for technology and innovation, and I believe that sharing knowledge is vital in this fast-paced digital age. From exploring the latest gadgets to discussing trends in software development, I’ll be covering a wide range of topics related to technology. In addition to tech discussions, I’ll also delve into how technology impacts our everyday lives. I want to create engaging content that not only informs but also inspires others to explore the world of tech. Whether you’re a seasoned developer or just curious about technology, there will be something here for everyone. Join me on this adventure as I navigate the tech landscape, and feel free to share your thoughts or topics you’d like me to cover in the future!',
      userId: allUsers[1].id,
      published: true,
      timestamp: new Date(),
    },
    {
      title: 'Alice’s Second Post',
      content:
        'Hello again, dear readers! I’m back with my second post, and today, I want to reflect on the importance of self-care in our busy lives. In our fast-paced world, it’s easy to forget to take a step back and focus on our mental and physical well-being. Over the past few weeks, I’ve learned the significance of incorporating self-care routines into my daily life. Whether it’s taking a moment to meditate, going for a walk in nature, or indulging in a good book, these small acts can significantly impact our overall happiness and productivity. I’ll be sharing some of my favorite self-care practices and tips that have helped me recharge and stay grounded. Remember, it’s okay to prioritize yourself and take a break when needed. Life is a journey, and we must nurture ourselves to enjoy the ride fully. I look forward to hearing your thoughts on self-care and any practices that work for you. Let’s support each other on this journey of self-discovery and well-being!',
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
