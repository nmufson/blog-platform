import NewPostForm from '../components/NewPostForm/NewPostForm';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import Notification from '../components/Notification/Notification.jsx';
import { useState, useEffect } from 'react';
import { useRef } from 'react';

import { useOutletContext, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { newBlogPost } from '../../../shared/services/blogPostService.js';

const NewPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // consolidate these three into an object
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [modalType, setModalType] = useState(null);
  const [titleFocused, setTitleFocused] = useState(false);
  const [editorFocused, setEditorFocused] = useState(false);
  const { user } = useOutletContext();

  const titleRef = useRef(null);
  const editorRef = useRef(null);

  const handleFocus = () => {
    if (titleFocused && titleRef.current) {
      titleRef.current.focus();
    } else if (editorFocused && editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleDiscardClick = () => {
    setModalType('discard');
    setIsModalOpen(true);
  };

  const handleSubmitClick = () => {
    setModalType('submit');
    setIsModalOpen(true);
  };

  const handleConfirm = (e, publish) => {
    if (modalType === 'discard') {
      discardPost();
    } else if (modalType === 'submit') {
      if (postContent.trim() === '') return;
      submitPost(e, publish);
    }
    setIsModalOpen(false);
  };

  const submitPost = async (e, publish) => {
    e.preventDefault();
    if (postContent.trim() === '') return;

    try {
      const response = await newBlogPost(
        user,
        postTitle,
        postContent,
        publish,
        imageURL,
      );
      setPostContent('');
      const newPost = response.newPost;
      window.location.href = `/posts/${newPost.id}`;
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const discardPost = () => {
    setPostContent('');
    setPostTitle('');
    console.log('Post discarded.');
  };

  return (
    <>
      <NewPostForm
        handleDiscardClick={handleDiscardClick}
        submitPost={submitPost}
        handleSubmitClick={handleSubmitClick}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        imageURL={imageURL}
        setImageURL={setImageURL}
        titleRef={titleRef}
        editorRef={editorRef}
        titleFocused={titleFocused}
        setTitleFocused={setTitleFocused}
        editorFocused={editorFocused}
        setEditorFocused={setEditorFocused}
      ></NewPostForm>
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

export default NewPost;
