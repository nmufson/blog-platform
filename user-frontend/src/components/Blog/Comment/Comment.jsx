import React from "react";

const Comment = ({ comment }) => {
  console.log(comment);
  const username = comment.user.username;
  const content = comment.content;

  return (
    <li>
      <strong>{username}</strong>
      <p>{content}</p>
    </li>
  );
};

export default Comment;
