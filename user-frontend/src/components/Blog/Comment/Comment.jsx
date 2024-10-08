import React from 'react';
import formatDateTime from '../../../../../shared/utils/formatDateTime';
import styles from './Comment.module.css';
const Comment = ({ comment }) => {
  const username = comment.user.username;
  const content = comment.content;

  const { date, time } = formatDateTime(comment.timestamp);

  return (
    <li>
      <div className={styles.Comment}>
        <strong>{username}</strong>
        <p>{content}</p>
        <small>
          {time} - {date}
        </small>
      </div>
    </li>
  );
};

export default Comment;
