import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './BlogPreview.module.css';
import formatDateTime from '../../../utils/formatDateTime';

const BlogPreview = ({ post }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const { date } = formatDateTime(post.timestamp);
  const formattedDate = date;

  return (
    <div onClick={handlePostClick} className={styles.BlogPreview}>
      <>
        <img
          src={post.imageURL}
          className={styles.blogPreviewImage}
          alt={post.imageAltText}
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

BlogPreview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    imageAltText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogPreview;
