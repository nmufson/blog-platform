import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment'; // Assuming you have a Comment component
import { useOutletContext, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';
import { submitComment, deleteComment } from '../../../services/commentService';
import { fetchBlogPostById } from '../../../services/blogPostService';
import Modal from '../../Modal/Modal';
import DOMPurify from 'dompurify';

const CommentSection = ({ postId }) => {
  const { user } = useOutletContext();

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [commentDraft, setCommentDraft] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetchBlogPostById(postId);
      setPost(response.post);
      setComments(response.post.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const openModal = (comment) => {
    setModalOpen(true);
    setCommentToDelete(comment);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCommentToDelete('');
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setCommentDraft(DOMPurify.sanitize(value));
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
      await submitComment(commentDraft, user, postId);

      setCommentDraft('');
      setIsFocused(false);
      await fetchComments();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (commentToDelete) {
      await deleteComment(commentToDelete.id, user, postId);
      closeModal();
      await fetchPost();
    }
  };

  return (
    <>
      <div className={styles.CommentSection}>
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
                post={post}
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

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentSection;
