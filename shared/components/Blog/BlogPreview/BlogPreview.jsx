import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogPreview.module.css';
import formatDateTime from '../../../utils/formatDateTime';

const BlogPreview = ({ post }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
    window.scrollTo(0, 0);
  };

  const { date } = formatDateTime(post.timestamp);
  const formattedDate = date;

  return (
    <div onClick={handlePostClick} className={styles.BlogPreview}>
      <>
        <img
          src={post.imageURL}
          // {have user include alt text}
          // alt={post.altText}
          className={styles.blogPreviewImage}
        />
        <div className={styles.bottomDiv}>
          <h3>{post.title}</h3>
          <div className={styles.details}>
            <small>{post.user.username}</small>
            <small>{formattedDate}</small>
          </div>
        </div>
      </>
    </div>
  );
};

export default BlogPreview;
