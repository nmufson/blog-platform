// CommentList.jsx
import React from "react";
import Comment from "./Comment"; // Assuming you have a Comment component

const CommentList = ({ comments }) => {
  return (
    <div>
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
    </div>
  );
};

export default CommentList;
