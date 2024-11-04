import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogPreview from '../../components/Blog/BlogPreview/BlogPreview';
import shuffleArr from '../../utils/shuffleArr';
import { fetchBlogPosts } from '../../services/blogPostService';
import { useAuth } from '../../hooks/useAuth/useAuth';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { setLoading } = useAuth();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data.posts);
      } catch (error) {
        setError(error.message || 'Failed to load posts');
      } finally {
        setLoading(false);
        setHasFetched(true);
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

  if (posts.length === 0 && hasFetched) {
    return <p className={styles.noPost}>No posts yet</p>;
  }

  const shuffledPosts = shuffleArr(posts);

  const firstFourPosts = shuffledPosts.slice(0, 4);
  const remainingPosts = shuffledPosts.slice(4);

  return (
    <>
      <div className={styles.home}>
        {user?.canPost && (
          <button onClick={onButtonClick} className={styles.newPost}>
            Draft New Post
          </button>
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
