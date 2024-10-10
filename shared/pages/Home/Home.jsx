import BlogPreviewList from '../../components/Blog/BlogPreviewList/BlogPreviewList';
import { useOutletContext } from 'react-router-dom';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/newpost');
  };
  return (
    <>
      <div className={styles.Home}>
        {user?.canPost && (
          <button onClick={onButtonClick}>Draft New Post</button>
        )}
        <BlogPreviewList />
      </div>
    </>
  );
};

export default Home;
