import { useEffect, useState, useRef } from 'react';
import { fetchBlogPosts } from '../../../services/blogPostService';

import BlogPreview from '../BlogPreview/BlogPreview';
import styles from './BlogPreviewList.module.css';

const BlogPreviewList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const masonryRef = useRef(null); // ref for the masonry container

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

  const firstFourPosts = posts.slice(0, 4);
  const remainingPosts = posts.slice(4);

  return (
    // <div className={styles.blogPreviewContainer}>
    //   {posts.map((post) => (
    //     <BlogPreview key={post.id} post={post} />
    //   ))}
    // </div>
    <>
      <div className={styles.topGridContainer}>
        {firstFourPosts.map((post) => (
          <BlogPreview key={post.id} post={post} />
        ))}
      </div>
      <div>
        <h3>Other Posts:</h3>
      </div>
      {remainingPosts.length > 0 && (
        <div className={styles.otherPostsContainer}>
          {remainingPosts.map((post) => (
            <BlogPreview key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogPreviewList;
