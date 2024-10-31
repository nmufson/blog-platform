const API_URL = process.env.API_URL;

export const newBlogPost = async (
  user,
  title,
  content,
  publish,
  imageURL,
  imageAltText,
) => {
  const userId = user.id;
  const token = user.token;

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },

      body: JSON.stringify({
        title,
        content,
        userId,
        publish,
        imageURL,
        imageAltText,
      }),
    });

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
    const response = await fetch(`${API_URL}/posts`);
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
    const response = await fetch(`${API_URL}/posts/post/${postId}`);
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
    const response = await fetch(`${API_URL}/posts/latest`);
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

  try {
    const response = await fetch(`${API_URL}/posts/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    const response = await fetch(`${API_URL}/posts/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ title, content, published }),
    });
    // Replace with your backend route
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400 && errorData.errors) {
        throw new Error('Validation failed');
      } else {
        throw new Error(
          `Failed to update post: ${response.status} ${response.statusText}`,
        );
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};
