import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogPostById } from "../../services/blogPostService";
import CommentList from "../../components/Blog/CommentList/CommentList";

const BlogPost = () => {
  const { postId } = useParams(); // Extract postId from URL
  const location = useLocation(); // Access state passed from navigation
  const [post, setPost] = useState(location.state?.post || null);

  // tries to pull post data from parent component state, or calls
  // api if it can't
  useEffect(() => {
    if (!post) {
      const getPost = async () => {
        try {
          const data = await fetchBlogPostById(postId);
          setPost(data.post); // Assuming the post is nested under `data.post`
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      getPost();
    }
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <CommentList comments={post.comments}></CommentList>
    </>
  );
};

export default BlogPost;
