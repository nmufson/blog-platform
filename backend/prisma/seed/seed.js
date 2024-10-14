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
      title:
        'The Importance of Walkability and Bike Infrastructure in Urbanism',
      content: `<h2>Understanding Urbanism</h2>
                  <p>Urbanism refers to the study and design of cities, emphasizing how urban environments can enhance the quality of life for their inhabitants. At the heart of successful urbanism lies the concept of walkability — the measure of how friendly an area is to walking.</p>

                  <h2>Why Walkability Matters</h2>
                  <p>Walkable cities promote healthier lifestyles, reduce traffic congestion, and lower pollution levels. When neighborhoods are designed with pedestrian-friendly infrastructure, such as sidewalks, crosswalks, and green spaces, residents are more likely to walk to their destinations.</p>
                  <p>Moreover, walkability fosters community interaction. People are more inclined to engage with their surroundings and with each other when they can easily stroll through their neighborhoods. This sense of community can lead to safer, more vibrant environments.</p>

                  <h2>The Role of Bike Infrastructure</h2>
                  <p>In addition to walking, cycling is an essential component of urban mobility. Well-designed bike infrastructure, including dedicated bike lanes, bike-sharing programs, and secure parking, encourages more people to opt for cycling as a primary mode of transportation.</p>
                  <p>Good bike infrastructure not only reduces car dependency but also contributes to reduced emissions, improved air quality, and enhanced physical health. Cities that prioritize cycling create a more sustainable urban environment.</p>

                  <h2>Conclusion</h2>
                  <p>In conclusion, the principles of urbanism advocate for walkable and bike-friendly cities. By investing in pedestrian and cycling infrastructure, urban planners can create healthier, more connected, and more sustainable communities. Embracing these ideals is crucial for the future of urban living.</p>

                  <p>For more insights on urbanism and sustainable living, follow our blog or connect with us on social media!</p>`,
      userId: allUsers[0].id,
      published: true,
      timestamp: new Date(),
      image:
        'https://cdn.vox-cdn.com/thumbor/7bO5pVP0Qadns5u1LoWrJlBqt9s=/0x0:6016x4016/1200x800/filters:focal(2527x1527:3489x2489)/cdn.vox-cdn.com/uploads/chorus_image/image/62709976/shutterstock_1155677656.0.jpg',
    },
    {
      title: 'Looking for a Hobby? Try Language Learning',
      content: `<p>Language learning is not just an educational pursuit; it can also be a fulfilling and enjoyable <strong>hobby</strong>. Whether you’re picking up a new language for travel, personal interest, or cognitive benefits, engaging with languages can provide a rich and rewarding experience.</p>

<h3>Fun and Engaging</h3>
<p>Learning a language opens the door to <strong>new cultures</strong> and experiences. From exploring foreign films and music to reading literature in its original form, the journey of language learning can be both fun and enriching. This hobby encourages you to immerse yourself in diverse cultural contexts, making each learning session an adventure.</p>

<h3>Social Connections</h3>
<p>Language learning can also lead to <strong>meaningful connections</strong> with others. Joining language classes, conversation groups, or online forums allows you to meet new people who share your interests. These interactions can lead to friendships and provide opportunities for cultural exchange, making the learning process more enjoyable.</p>

<h3>Cognitive Benefits</h3>
<p>Engaging in a language hobby is an excellent way to keep your mind active and sharp. Research has shown that learning a new language can improve memory, enhance problem-solving skills, and boost creativity. This cognitive exercise makes language learning a valuable hobby that benefits your overall mental health.</p>

<h3>A Sense of Achievement</h3>
<p>As you progress in your language learning journey, you'll experience a profound sense of <strong>accomplishment</strong>. Each new word, phrase, or grammar rule mastered brings you closer to fluency. This achievement fosters confidence and motivates you to continue expanding your language skills.</p>

<h3>Conclusion</h3>
<p>In conclusion, language learning is not just a practical skill; it is a rewarding hobby that enriches your life in many ways. From cultural exploration to cognitive enhancement and social interaction, the benefits of learning a language are numerous. So why not embark on this exciting journey today and discover the joy of language learning?</p>`,
      userId: allUsers[1].id,
      published: true,
      timestamp: new Date(),
      image:
        'https://ec.europa.eu/eurostat/documents/4187653/15349461/Prostock-studio_AdobeStock_437049103_RV.jpg',
    },
    {
      title: 'Sweet Potatoes Are Incredible',
      content: `<p>Sweet potatoes are a delicious and nutritious addition to any diet. They are not only versatile and easy to prepare but also packed with essential nutrients that can support overall health.</p>

<h3>Affordability</h3>
<p>One of the best things about sweet potatoes is their <strong>affordability</strong>. They are often less expensive than other vegetables and can be found in most grocery stores year-round. This makes them a budget-friendly option for families and individuals looking to eat healthily without breaking the bank.</p>

<h3>Nutrient-Rich</h3>
<p>Sweet potatoes are incredibly <strong>nutrient-dense</strong>, providing a wealth of vitamins and minerals. They are an excellent source of vitamin A, which is vital for eye health, and also contain significant amounts of vitamin C, potassium, and dietary fiber. Incorporating sweet potatoes into your meals can help you meet your daily nutrient needs.</p>

<h3>Easy to Prepare</h3>
<p>Another reason to love sweet potatoes is how <strong>easy they are to cook</strong>. Whether you roast, boil, mash, or bake them, sweet potatoes can be prepared in various ways to suit your taste. They can also be added to soups, stews, or salads, making them a versatile ingredient in the kitchen.</p>

<h3>Delicious Flavor</h3>
<p>Sweet potatoes are naturally <strong>sweet and flavorful</strong>, making them a favorite among many. Their creamy texture and sweet taste pair well with both savory and sweet dishes, allowing for endless culinary possibilities. From sweet potato fries to casseroles, there's no shortage of tasty recipes to try.</p>

<h3>Conclusion</h3>
<p>In conclusion, sweet potatoes are an excellent food choice for anyone looking to eat healthily. With their affordability, nutrient-rich profile, ease of preparation, and delicious flavor, sweet potatoes are a wonderful addition to your meals. Consider adding them to your diet and enjoy all the benefits they have to offer!</p>`,
      userId: allUsers[0].id,
      published: false,
      timestamp: new Date(),
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.JPG/800px-Ipomoea_batatas_006.JPG',
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
