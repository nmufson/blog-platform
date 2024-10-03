import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const { postId } = useParams(); // Extract postId from URL
  const location = useLocation(); // Access state passed from navigation
  const [post, setPost] = useState(location.state?.post || null);

  // tries to pull post data from parent component state, or calls
  // api if it can't
  useEffect(() => {
    if (!post) {
      // If post is not passed in state, fetch from backend
      const fetchPost = async () => {
        try {
          const response = await fetch(`/posts/${postId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const data = await response.json();
          setPost(data.post);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
