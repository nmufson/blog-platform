import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../../../services/blogPostService";
import { useNavigate } from "react-router-dom";

const BlogPreviews = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data.posts);
      } catch (error) {
        setError("Failed to load posts");
      }
    };

    loadPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlePostClick = (post) => {
    navigate(`/posts/${post.id}`, { state: { post } }); // Pass the post data via state
  };

  return (
    <div>
      {posts.map((post) => {
        const excerpt = post.content.substring(0, 100);
        return (
          <div key={post.id} onClick={() => handlePostClick(post)}>
            <h2>{post.title}</h2>
            <p>
              {excerpt}
              {post.content.length > 100 && "..."}{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BlogPreviews;
