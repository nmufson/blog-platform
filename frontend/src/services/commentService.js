const API_URL = import.meta.env.VITE_API_URL;

export const submitComment = async (comment, user, postId) => {
  const userId = user.id;
  const token = user.token;
  try {
    const response = await fetch(`${API_URL}/comments/post/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify({ comment, userId }),
    });
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

export const deleteComment = async (commentId, user, postId) => {
  const token = user.token;
  try {
    const response = await fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token here
      },
    });
    // Replace with your backend route
    if (!response.ok) {
      const errorMessage = `Failed to delete comment: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    // common response for delete requests
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// export const fetchComments = async (postId) => {
//   try {
//     const response = await fetch(
//       `${API_URL}/comments/post/${postId}`,
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
