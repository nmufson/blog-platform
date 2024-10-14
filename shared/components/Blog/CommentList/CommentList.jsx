// CommentList.jsx
import React from 'react';
import Comment from '../Comment/Comment'; // Assuming you have a Comment component
import { useOutletContext, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CommentList.module.css';
import { submitComment, deleteComment } from '../../../services/commentService';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPostById } from '../../../services/blogPostService';
import Modal from '../../Modal/Modal';

const CommentList = ({ post }) => {
  const { user } = useOutletContext();

  const [comments, setComments] = useState(post.comments || []);
  const [isFocused, setIsFocused] = useState(false);
  const [commentDraft, setCommentDraft] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState('');

  const openModal = (comment) => {
    setModalOpen(true);
    setCommentToDelete(comment);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCommentToDelete('');
  };

  const handleCommentChange = (e) => {
    setCommentDraft(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setCommentDraft('');
  };

  const fetchPost = async () => {
    try {
      const response = await fetchBlogPostById(post.id);

      setComments(response.post.comments);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentDraft.trim() === '') return;

    try {
      await submitComment(commentDraft, user, post.id);
      setCommentDraft('');
      setIsFocused(false);
      await fetchPost(); // Re-fetch the post to get the updated comments
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (commentToDelete) {
      await deleteComment(commentToDelete.id, user);
      closeModal();
      await fetchPost();
    }
  };

  return (
    <>
      <div className={styles.CommentList}>
        <h2>Comments</h2>
        {user ? (
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea
              value={commentDraft}
              onChange={handleCommentChange}
              onFocus={handleFocus}
              placeholder="Leave a comment..."
            />
            <div
              className={`${styles.commentButtonDiv} ${isFocused ? styles.visible : ''}`}
            >
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className={`${commentDraft === '' ? styles.disabled : ''}`}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p>
            <Link to="/login">Log In</Link> to comment.
          </p>
        )}
        {comments.length === 0 ? (
          <p className={styles.noCommentsP}>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                openModal={openModal}
                comment={comment}
              />
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this comment?"
        confirmText="Delete"
      />
    </>
  );
};

export default CommentList;
