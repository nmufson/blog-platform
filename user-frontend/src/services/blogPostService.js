export const fetchBlogPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/posts"); // Replace with your backend route
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

export const fetchBlogPostById = async (postId) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/post/${postId}`); // Replace with your backend route
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};
