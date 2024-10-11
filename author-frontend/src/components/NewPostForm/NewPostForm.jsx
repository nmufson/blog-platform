import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './NewPostForm.module.css';
import { useRef } from 'react';
import EditorComponent from '../Editor/Editor.jsx';

const NewPostForm = ({
  handleDiscardClick,
  submitPost,
  handleSubmitClick,
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  titleRef,
  editorRef,
  titleFocused,
  setTitleFocused,
  editorFocused,
  setEditorFocused,
}) => {
  const handleChange = (content) => {
    setPostContent(content);
  };

  const handleFocus = () => {};

  // discard (modal asking if they want to delete progress or save as draft)
  // save as draft
  // publish
  // ask if they want to save draft
  return (
    <>
      <form className={styles.newPostForm}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          ref={titleRef}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          onClick={() => {
            setTitleFocused(true);
            setEditorFocused(false);

            console.log('title:', titleFocused, 'editor', editorFocused);
          }}
        />
        <EditorComponent
          content={postContent}
          onContentChange={handleChange}
          editorRef={editorRef}
          setTitleFocused={setTitleFocused}
          setEditorFocused={setEditorFocused}
          titleFocused={titleFocused}
          editorFocused={editorFocused}
        ></EditorComponent>

        <div className={styles.postButtonDiv}>
          <button
            type="button"
            onClick={handleDiscardClick}
            disabled={postContent === '' && postTitle === ''}
            className={`${postContent === '' && postTitle === '' ? styles.disabled : ''}`}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={(e) => submitPost(e, false)}
            disabled={postContent.trim() === '' || postTitle.trim() === ''}
            className={`${postContent.trim() === '' || postTitle.trim() === '' ? styles.disabled : ''}`}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={postContent.trim() === '' || postTitle.trim() === ''}
            className={`${postContent.trim() === '' || postTitle.trim() === '' ? styles.disabled : ''}`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
