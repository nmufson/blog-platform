import React from "react";

const Comment = ({ comment }) => {
  return (
    <li>
      <strong>{comment.author}</strong>:<p>{comment.content}</p>
    </li>
  );
};

export default Comment;
