const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log(`Existing data deleted!`);

  const usersData = [
    {
      email: 'alice@example.com',
      username: 'Alice Thinksdeep',
      password: 'Password123&',
      canPost: true,
    },
    {
      email: 'bob@example.com',
      username: 'Bob Writeswell',
      password: 'Password456$',
      canPost: true,
    },
    {
      email: 'charlie@example.com',
      username: 'Charlie Speakswise',
      password: 'Password789@',
      canPost: true,
    },
    {
      email: 'nick@gmail.com',
      username: 'Nick Featherpage',
      password: 'Lembas123!',
      canPost: true,
    },
  ];

  const hashedUsersData = await Promise.all(
    usersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    }),
  );

  // Insert multiple users using createMany
  await prisma.user.createMany({
    data: hashedUsersData,
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
      content: `<h3>Understanding Urbanism</h2>
                  <p>Urbanism refers to the study and design of cities, emphasizing how urban environments can enhance the quality of life for their inhabitants. At the heart of successful urbanism lies the concept of walkability — the measure of how friendly an area is to walking.</p>

                  <h3>Why Walkability Matters</h2>
                  <p>Walkable cities promote healthier lifestyles, reduce traffic congestion, and lower pollution levels. When neighborhoods are designed with pedestrian-friendly infrastructure, such as sidewalks, crosswalks, and green spaces, residents are more likely to walk to their destinations.</p>
                  <p>Moreover, walkability fosters community interaction. People are more inclined to engage with their surroundings and with each other when they can easily stroll through their neighborhoods. This sense of community can lead to safer, more vibrant environments.</p>

                  <h3>The Role of Bike Infrastructure</h2>
                  <p>In addition to walking, cycling is an essential component of urban mobility. Well-designed bike infrastructure, including dedicated bike lanes, bike-sharing programs, and secure parking, encourages more people to opt for cycling as a primary mode of transportation.</p>
                  <p>Good bike infrastructure not only reduces car dependency but also contributes to reduced emissions, improved air quality, and enhanced physical health. Cities that prioritize cycling create a more sustainable urban environment.</p>

                  <h3>Conclusion</h2>
                  <p>In conclusion, the principles of urbanism advocate for walkable and bike-friendly cities. By investing in pedestrian and cycling infrastructure, urban planners can create healthier, more connected, and more sustainable communities. Embracing these ideals is crucial for the future of urban living.</p>

                  <p>For more insights on urbanism and sustainable living, follow our blog or connect with us on social media!</p>`,
      userId: allUsers[0].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://static01.nyt.com/images/2020/03/13/nyregion/13nyvirus-biking1/13nyvirus-biking1-videoSixteenByNineJumbo1600.jpg',
      imageAltText: 'People bike communiting in New York City',
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
      imageURL:
        'https://gurmentor.com/wp-content/uploads/2020/06/gurmentor.com-best-techniques-for-learning-a-foreign-language-2020-06-18_14-13-33_992016.jpg',
      imageAltText: 'Art depicting different languages around the world',
    },
    {
      title: 'The Benefits of Maintaining a Consistent Sleep-Wake Routine',
      content: `<p>
          A consistent sleep-wake routine is more than just a habit—it's a foundation for overall well-being. While it's tempting to hit the snooze button on weekends or stay up late, aligning your sleep schedule can offer numerous advantages for your physical and mental health.
        </p>

        <h3>Improves Sleep Quality</h3>
        <p>
          When you go to bed and wake up at the same time each day, your body adapts to a natural rhythm known as the circadian rhythm. This helps you fall asleep more quickly and achieve deeper sleep, ensuring you wake up feeling refreshed and recharged.
        </p>

        <h3>Boosts Mental Clarity and Focus</h3>
        <p>
          A stable sleep pattern supports cognitive functions like memory, problem-solving, and focus. By sticking to a routine, your brain knows when to wind down and when to be alert, making it easier to stay sharp throughout the day.
        </p>

        <h3>Enhances Mood and Reduces Stress</h3>
        <p>
          Poor sleep can lead to irritability and increased stress. On the other hand, a regular sleep schedule helps stabilize your mood by ensuring you get enough rest each night. This can reduce feelings of anxiety and make it easier to handle daily challenges.
        </p>

        <h3>Morning Walks: A Refreshing Start</h3>
        <p>
          Incorporating a morning walk into your routine can further boost the benefits of a consistent sleep schedule. Morning walks help you soak in natural sunlight, which signals your body to wake up and align your internal clock for the day. Exposure to sunlight in the morning can also improve your sleep at night by regulating your body's production of melatonin.
        </p>
        <p>
          Additionally, morning walks are a great way to energize your body and mind, providing a gentle form of exercise that can elevate your mood and kickstart your metabolism. It's a simple way to start your day on a positive note and enhance the benefits of a steady sleep-wake cycle.
        </p>

        <h3>Supports Physical Health</h3>
        <p>
          Consistent sleep helps regulate important bodily functions, including metabolism, immune system strength, and heart health. This means that by prioritizing a steady sleep-wake routine, you're also taking care of your body in the long run.
        </p>

        <p>
          Overall, maintaining a regular sleep-wake schedule, along with a morning walk, is a simple yet effective way to support a healthier lifestyle. Set a bedtime, stick to it, and consider adding a daily walk to start your mornings right. You’ll soon notice the positive impact on your energy, mood, and focus!
        </p>`,
      userId: allUsers[2].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://earthtrekgear.com/cdn/shop/articles/morningwalktomasz-wozniak-V62UrdknDCA-unsplash.jpg?v=1582743235',
      imageAltText: 'People running as sun rises in the background',
    },
    {
      title: 'The OneBag Travel Trend: Embrace Minimalism on the Go',
      content: `<p>
        The OneBag travel trend is all about simplicity and freedom. Rather than lugging around heavy suitcases and multiple bags, OneBag travelers aim to pack everything they need into a single, compact bag. This minimalist approach to travel has gained popularity among adventurers who value flexibility and a stress-free experience.
      </p>

      <h3>Why Choose OneBag Travel?</h3>
      <p>
        Traveling with just one bag offers numerous advantages. It allows for faster airport navigation, easy transitions between destinations, and a lighter load. No more waiting at baggage claim or worrying about lost luggage—your essentials are always with you. The simplicity of packing less means you can focus more on your experiences rather than your belongings.
      </p>

      <h3>Focus on Essentials</h3>
      <p>
        OneBag travel encourages you to be intentional with what you pack, focusing only on versatile, multi-purpose items. It’s a chance to rethink what you truly need while on the road, helping you become more adaptable and creative with your wardrobe and gear.
      </p>

      <h3>A Sustainable Choice</h3>
      <p>
        In addition to convenience, OneBag travel is also environmentally friendly. By packing lighter, you reduce your carbon footprint when flying or taking other forms of transportation. Plus, it’s a way to practice mindful consumption, bringing only what truly adds value to your journey.
      </p>

      <p>
        The OneBag trend is ideal for those who love adventure, appreciate flexibility, and enjoy the challenge of living with less. With a little planning and smart packing, you can experience the freedom of travel without being weighed down—literally and figuratively.
      </p>`,
      userId: allUsers[0].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://cdn.thewirecutter.com/wp-content/media/2023/12/backpackforlife-2048px-goruck-3x2-1.jpg?auto=webp&quality=75&width=1024',
      // https://capital-placement.com/wp-content/uploads/2021/07/The-benefits-of-travelling.jpg
      imageAltText: 'Traveler wearing backpack looking at view',
    },
    {
      title:
        'Steady State Cardio vs. High-Intensity Cardio: Which is Right for You?',
      content: `<p>
          When it comes to fitness, cardio exercises are essential for improving cardiovascular health, burning calories, and enhancing endurance. However, two popular approaches—steady state cardio and high-intensity cardio—offer different benefits and may suit different fitness goals. Understanding their differences can help you choose the right routine for your needs.
        </p>

        <h3>What is Steady State Cardio?</h3>
        <p>
          Steady state cardio involves maintaining a consistent, moderate level of intensity over a prolonged period. This could include activities like jogging, cycling, or swimming at a steady pace. Steady state workouts are generally easier to sustain for longer durations, making them an excellent option for endurance training and building aerobic capacity.
        </p>

        <h3>The Benefits of Steady State Cardio</h3>
        <ul>
          <li><strong>Improved Endurance:</strong> Regular steady state cardio sessions enhance stamina, allowing you to perform activities for longer periods.</li>
          <li><strong>Lower Injury Risk:</strong> The moderate intensity of steady state exercises typically results in a lower risk of injury compared to high-intensity workouts.</li>
          <li><strong>Stress Reduction:</strong> The rhythmic nature of steady state cardio can be meditative, helping to reduce stress levels and improve mental well-being.</li>
        </ul>

        <h3>What is High-Intensity Cardio?</h3>
        <p>
          High-intensity cardio, often referred to as HIIT (High-Intensity Interval Training), consists of short bursts of intense exercise followed by brief recovery periods. Activities can include sprinting, cycling, or circuit training. This approach is known for its efficiency, allowing for significant calorie burning in a shorter amount of time.
        </p>

        <h3>The Benefits of High-Intensity Cardio</h3>
        <ul>
          <li><strong>Time Efficiency:</strong> HIIT workouts can often be completed in 20-30 minutes while delivering substantial calorie burn.</li>
          <li><strong>Increased Metabolism:</strong> The intensity of HIIT can lead to an elevated metabolic rate for hours after your workout, known as the afterburn effect.</li>
          <li><strong>Variety and Fun:</strong> High-intensity workouts can be varied and engaging, helping to keep you motivated and excited about your fitness routine.</li>
        </ul>

        <h3>Which Should You Choose?</h3>
        <p>
          Ultimately, the best choice between steady state and high-intensity cardio depends on your personal goals, fitness level, and preferences. If you're looking for improved endurance and a lower-impact workout, steady state cardio may be ideal. Conversely, if you're short on time and seeking to maximize calorie burn, high-intensity cardio could be the better option.
        </p>

        <p>
          Many fitness enthusiasts find a combination of both approaches to be the most effective. Incorporating a mix of steady state and high-intensity workouts can help you enjoy the benefits of each while keeping your routine fresh and challenging. Listen to your body, find what works for you, and enjoy the journey to better health!
        </p>`,
      userId: allUsers[1].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://www.in.gov/cybersecurity/blog/images/running_image.jpg',
      imageAltText: 'Silhouette of several people running',
    },
    {
      title: 'The Silence of Young Voices in Local Politics',
      content: `<p>
          In recent years, there's been a growing concern that young people are not sufficiently engaged in local politics. Despite being heavily affected by the decisions made at the community level, many young individuals often feel disconnected or disillusioned with the political process. This trend is troubling, as the involvement of young people in local politics is crucial for shaping the future of their communities.
        </p>

        <h3>Understanding the Disengagement</h3>
        <p>
          Several factors contribute to the lack of youth engagement in local politics. Many young people perceive politics as boring, complicated, or dominated by older generations. Additionally, the fast-paced nature of modern life, including education and career demands, can leave little room for civic involvement. This disengagement can lead to a lack of representation and a disconnect between the needs of young citizens and the policies enacted by local governments.
        </p>

        <h3>The Impact of Youth Involvement</h3>
        <p>
          When young people actively participate in local politics, they bring fresh perspectives and innovative ideas to the table. Their engagement can influence crucial issues such as education, climate change, housing, and job opportunities—topics that directly affect their lives and futures. Furthermore, young voices can advocate for change, pushing local leaders to prioritize policies that address their concerns.
        </p>

        <h3>Why Getting Involved Matters</h3>
        <p>
          Engaging in local politics offers young people an opportunity to make a tangible impact in their communities. By participating in town hall meetings, voting in local elections, and joining advocacy groups, young individuals can shape the decisions that affect their lives. Additionally, getting involved fosters a sense of community and empowerment, allowing young people to connect with like-minded peers and create networks of support.
        </p>

        <h3>How to Get Involved</h3>
        <p>
          Fortunately, there are many ways for young people to become more engaged in local politics:
        </p>
        <ul>
          <li><strong>Attend Local Meetings:</strong> Participate in town hall meetings or city council sessions to stay informed and voice your opinions.</li>
          <li><strong>Volunteer for Campaigns:</strong> Support candidates or causes you believe in by volunteering your time and skills.</li>
          <li><strong>Educate Yourself:</strong> Take the time to understand local issues and policies, making informed decisions at the polls.</li>
          <li><strong>Join Youth Organizations:</strong> Connect with groups that advocate for youth interests in politics, amplifying your voice and efforts.</li>
        </ul>

        <p>
          In conclusion, while there may be a perception that young people are not involved enough in local politics, there is a growing movement of engaged and passionate youth seeking to make a difference. By encouraging greater participation and recognizing the value of their voices, we can ensure that the concerns of younger generations are heard and addressed. It’s time for young people to step up and take an active role in shaping their communities' futures!
        </p>`,
      userId: allUsers[2].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://media.wired.com/photos/66c7baadb9d04db8f0de5aca/3:2/w_1280%2Cc_limit/politics_election_betting.jpg',
      imageAltText: 'Votes being cast into a ballot',
    },
    {
      title: 'The Value of Eating Whole Foods and Avoiding Processed Foods',
      content: `
        <p>In today’s fast-paced world, the convenience of processed foods often tempts us to make quick dietary choices. However, <strong>embracing whole foods</strong> can significantly enhance our health and well-being. In this post, we’ll explore the numerous benefits of choosing whole foods over their processed counterparts.</p>

        <h3>What Are Whole Foods?</h3>

        <p>Whole foods are those that are minimally processed and are as close to their natural state as possible. This includes fruits, vegetables, whole grains, nuts, seeds, and lean proteins. Unlike processed foods, which often contain added sugars, unhealthy fats, and artificial ingredients, whole foods provide a wealth of nutrients that our bodies need.</p>

        <h3>The Benefits of Whole Foods</h3>

        <ul>
          <li><strong>Nutrient-Rich</strong><br>
            Whole foods are packed with essential vitamins, minerals, and antioxidants that are crucial for maintaining optimal health. For example, fruits and vegetables are rich in fiber, which aids digestion and promotes a healthy gut.</li>
          
          <li><strong>Improved Energy Levels</strong><br>
            By choosing whole foods, you provide your body with a steady source of energy. Processed foods, often high in sugar and unhealthy fats, can lead to energy spikes followed by crashes. Whole foods release energy gradually, helping you maintain stamina throughout the day.</li>
          
          <li><strong>Weight Management</strong><br>
            Whole foods tend to be lower in calories and higher in nutritional value compared to processed foods. This makes it easier to manage your weight while ensuring your body receives the nutrients it needs. Incorporating more whole foods into your diet can promote a feeling of fullness, reducing the likelihood of overeating.</li>
          
          <li><strong>Better Mood and Mental Clarity</strong><br>
            Diet plays a significant role in mental health. Studies suggest that a diet rich in whole foods can improve mood and cognitive function. On the other hand, processed foods may contribute to feelings of sluggishness and irritability.</li>
          
          <li><strong>Reduced Risk of Chronic Diseases</strong><br>
            A diet focused on whole foods has been linked to a lower risk of chronic diseases, such as heart disease, diabetes, and certain cancers. The antioxidants and anti-inflammatory compounds found in whole foods can help protect your body from damage and support overall health.</li>
        </ul>

        <h3>Conclusion</h3>

        <p>Incorporating more whole foods into your diet while reducing processed food intake can have profound benefits for your physical and mental health. By making conscious food choices, you can nourish your body, improve your energy levels, and enhance your overall well-being. Embrace the power of whole foods and enjoy the delicious flavors and textures they have to offer!</p>`,
      userId: allUsers[3].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://images-prod.healthline.com/hlcmsresource/images/topic_centers/2020-7/whole-food-foods-healthy-vegetables-eggs-ingredients-1296x728-header.jpg',
      imageAltText: 'Several foods including fruits, vegetables, grain',
    },
    {
      title: 'The Vital Role of Trains in Modern Public Transit',
      content: `
        <p>In an era of increasing urbanization and growing environmental concerns, the importance of efficient public transportation cannot be overstated. Among the various modes of public transit, trains stand out as a crucial component in creating sustainable, accessible, and efficient urban mobility systems.</p>

    <h3>Why Trains Matter</h3>

    <p>Trains offer numerous advantages that make them an indispensable part of public transit:</p>

    <ul>
        <li><strong>High Capacity:</strong> Trains can move large numbers of people quickly and efficiently, reducing road congestion.</li>
        <li><strong>Environmental Friendliness:</strong> Electric trains produce significantly lower emissions per passenger compared to individual cars.</li>
        <li><strong>Reliability:</strong> With dedicated tracks, trains are less affected by traffic, offering more consistent travel times.</li>
        <li><strong>Urban Development:</strong> Train stations often become hubs for economic activity and urban renewal.</li>
    </ul>

    <h3>The Impact on Cities</h3>

    <p>Cities with well-developed train systems often experience:</p>

    <ul>
        <li>Reduced traffic congestion</li>
        <li>Improved air quality</li>
        <li>Enhanced mobility for all residents, including those without cars</li>
        <li>Increased property values near transit hubs</li>
    </ul>

    <h3>Looking to the Future</h3>

    <p>As we move towards smarter, more sustainable cities, investing in train infrastructure will be key. From high-speed inter-city rails to efficient metro systems, trains will continue to play a vital role in shaping the future of urban transportation.</p>

    <p>By prioritizing and expanding train networks, we can create more livable, accessible, and environmentally friendly urban spaces for generations to come.</p>
</body>`,
      userId: allUsers[3].id,
      published: true,
      timestamp: new Date(),
      imageURL:
        'https://grist.org/wp-content/uploads/2016/03/rail-china-reuters-c.jpg?quality=75&strip=all',
      imageAltText: 'High-speed passenger train in China',
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
