export const submitComment = async (comment, user, postId) => {
  const userId = user.id;
  const token = user.token;
  try {
    const response = await fetch(
      `http://localhost:5000/comments/post/${postId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify({ comment, userId }),
      },
    );
    // Replace with your backend route
    if (!response.ok) {
      const errorMessage = `Failed to submit comment: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};

// export const fetchComments = async (postId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/comments/post/${postId}`,
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch blog posts');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching blog posts:', error);
//     throw error;
//   }
// };
