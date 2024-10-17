import { useOutletContext } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import BlogPreview from '../../components/Blog/BlogPreview/BlogPreview';
import { fetchBlogPosts } from '../../services/blogPostService';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
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

  const onButtonClick = () => {
    navigate('/newpost');
  };

  if (error) {
    return <p>{error}</p>;
  }

  const firstFourPosts = posts.slice(0, 4);
  const remainingPosts = posts.slice(4);

  return (
    <>
      <div className={styles.Home}>
        {user?.canPost && (
          <button onClick={onButtonClick}>Draft New Post</button>
        )}

        <div className={styles.topGridContainer}>
          {firstFourPosts.map((post) => (
            <BlogPreview key={post.id} post={post} />
          ))}
        </div>
        <div className={styles.headingDiv}>
          <h3>Other Posts</h3>
          <hr />
        </div>
        {remainingPosts.length > 0 && (
          <div className={styles.otherPostsContainer}>
            {remainingPosts.map((post) => (
              <BlogPreview key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
