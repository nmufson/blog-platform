import NewPostForm from '../components/NewPostForm/NewPostForm';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import Notification from '../components/Notification/Notification.jsx';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import EditorComponent from '../components/Editor/Editor';
import { useOutletContext, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { newBlogPost } from '../../../shared/services/blogPostService.js';

const NewPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [modalType, setModalType] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [titleFocused, setTitleFocused] = useState(false);
  const [editorFocused, setEditorFocused] = useState(false);
  const { user } = useOutletContext();

  const navigate = useNavigate();

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleFocus();
  };

  const submitPost = async (e, publish) => {
    e.preventDefault();
    if (postContent.trim() === '') return;

    try {
      const response = await newBlogPost(postTitle, postContent, user, publish);
      setPostContent('');
      const newPost = response.newPost;
      navigate(`/posts/${newPost.id}`);
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
        onClose={handleCloseModal}
        confirmText={modalType === 'discard' ? 'Discard' : 'Publish'}
      />
      <Notification></Notification>
    </>
  );
};

export default NewPost;
