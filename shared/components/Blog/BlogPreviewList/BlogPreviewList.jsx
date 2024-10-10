import { useEffect, useState } from 'react';
import { fetchBlogPosts } from '../../../services/blogPostService';
import BlogPreview from '../BlogPreview/BlogPreview';

const BlogPreviewList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data.posts);
      } catch (error) {
        setError('Failed to load posts');
      }
    };

    loadPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <BlogPreview key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPreviewList;
