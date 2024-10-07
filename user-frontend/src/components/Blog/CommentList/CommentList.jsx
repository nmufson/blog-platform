// CommentList.jsx
import React from "react";
import Comment from "../Comment/Comment"; // Assuming you have a Comment component
import { useOutletContext, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./CommentList.module.css";

const CommentList = ({ comments }) => {
  const { user } = useOutletContext();
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value); // Update comment input
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newComment.trim() === "") return; // Prevent empty comments

    // Replace this with your API call to submit the comment
    try {
      // Assuming you have a function to submit a comment
      await submitComment(newComment);
      setNewComment(""); // Clear input after successful submission
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className={styles.CommentList}>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Leave a comment..."
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>
          <Link to="/login">Log In</Link> to comment.
        </p>
      )}
    </div>
  );
};

export default CommentList;
