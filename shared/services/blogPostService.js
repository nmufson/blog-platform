export const newBlogPost = async (title, content, user, publish) => {
  const userId = user.id;
  const token = user.token;
  try {
    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ title, content, userId, publish }),
    });
    // Replace with your backend route
    if (!response.ok) {
      const errorMessage = `Failed to submit post: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting post:', error);
    throw error;
  }
};

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch('http://localhost:5000/posts'); // Replace with your backend route
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostById = async (postId) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/post/${postId}`); // Replace with your backend route
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

export const fetchLatestPostId = async () => {
  try {
    const response = await fetch('http://localhost:5000/posts/latest');
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};
