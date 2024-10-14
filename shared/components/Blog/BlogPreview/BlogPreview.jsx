import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogPreview.module.css';
import formatDateTime from '../../../utils/formatDateTime';

const BlogPreview = ({ post }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  const excerpt = post.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 100);

  const { date, time } = formatDateTime(post.timestamp);
  const formattedDate = date;
  const formattedTime = time;

  return (
    <div onClick={handlePostClick} className={styles.BlogPreview}>
      <img
        src={post.image}
        // {have user include alt text}
        // alt={post.altText}
        className={styles.blogPreviewImage}
      />
      <div className={styles.bottomDiv}>
        <h2>{post.title}</h2>
      </div>

      <small>
        {formattedTime} - {formattedDate}
      </small>
    </div>
    // <div onClick={handlePostClick} className={styles.BlogPreview}>
    //   <div className={styles.topDiv}>
    //     <h2>{post.title}</h2>
    //     <small>{post.published ? 'Published' : 'Not Published'}</small>
    //   </div>
    //   <p>
    //     {excerpt}
    //     {post.content.length > 100 && '...'}{' '}
    //   </p>
    //   <small>
    //     {formattedTime} - {formattedDate}
    //   </small>
    // </div>
  );
};

export default BlogPreview;
