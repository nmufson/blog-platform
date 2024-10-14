export const newBlogPost = async (user, title, content, publish, imageURL) => {
  const userId = user.id;
  const token = user.token;
  try {
    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ title, content, userId, publish, imageURL }),
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

export const deleteBlogPost = async (user, postId) => {
  const token = user.token;
  const userId = user.id;
  console.log(user, token);
  try {
    const response = await fetch(`http://localhost:5000/posts/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (
  user,
  postId,
  title,
  content,
  published,
) => {
  const token = user.token;
  try {
    const response = await fetch(`http://localhost:5000/posts/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ title, content, published }),
    });
    // Replace with your backend route
    if (!response.ok) {
      const errorMessage = `Failed to update post: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};
