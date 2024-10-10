import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogPreview.module.css';
import formatDateTime from '../../../utils/formatDateTime';

const BlogPreview = ({ post }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const excerpt = post.content.substring(0, 100);

  const { date, time } = formatDateTime(post.timestamp);
  const formattedDate = date;
  const formattedTime = time;

  return (
    <div onClick={handlePostClick} className={styles.BlogPreview}>
      <h2>{post.title}</h2>
      <p>
        {excerpt}
        {post.content.length > 100 && '...'}{' '}
      </p>
      <small>
        {formattedTime} - {formattedDate}
      </small>
    </div>
  );
};

export default BlogPreview;
