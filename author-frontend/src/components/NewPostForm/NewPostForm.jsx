import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './NewPostForm.module.css';
import { useRef } from 'react';
import Modal from '../../../../shared/components/Modal/Modal.jsx';
import EditorComponent from '../EditorComponent/EditorComponent.jsx';

const NewPostForm = ({
  handleDiscardClick,
  submitPost,
  handleSubmitClick,
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  imageURL,
  setImageURL,
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
          maxLength={100}
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

        <label htmlFor="imageURL">Image URL (optional):</label>
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          onChange={(e) => setImageURL(e.target.value)}
        />

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
      <Modal
        title={modalType === 'discard' ? 'Discard Post' : 'Publish Post'}
        message={
          modalType === 'discard'
            ? 'Are you sure you want to discard this post? This action cannot be undone.'
            : 'Are you sure you want to publish this post?'
        }
        onConfirm={(e) => handleConfirm(e, modalType === 'submit')}
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmText={modalType === 'discard' ? 'Discard' : 'Publish'}
      />
    </>
  );
};

export default NewPostForm;
