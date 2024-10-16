import NewPostForm from '../components/NewPostForm/NewPostForm';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import Notification from '../components/Notification/Notification.jsx';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import styles from './NewPost.module.css';
import { useOutletContext, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditorComponent from '../components/EditorComponent/EditorComponent.jsx';
import { newBlogPost } from '../../../shared/services/blogPostService.js';
import LabelInput from '../components/LabelInput/LabelInput.jsx';
import { validateField } from './NewPost.js';

const NewPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageURL: '',
    imageAltText: '',
  });
  const [formErrors, setFormErrors] = useState({
    titleError: '',
    contentError: '',
    imageURLError: '',
    imageAltTextError: '',
  });
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    content: false,
    imageURL: false,
    imageAltText: false,
  });
  const [buttonEnabled, setButtonEnabled] = useState({
    discard: false,
    saveOrPublish: false,
  });

  const { user } = useOutletContext();

  const handleDiscardClick = () => {
    setModalType('discard');
    setIsModalOpen(true);
  };

  const discardPost = () => {
    setPost({ title: '', content: '', imageURL: '', imageAltText: '' });
    setButtonEnabled({ discard: false, saveOrPublish: false });
    console.log('Post discarded.');
  };

  const handleSubmitClick = () => {
    setModalType('publish');
    setIsModalOpen(true);
  };

  const handleConfirm = (e, publish) => {
    if (modalType === 'discard') {
      discardPost();
    } else if (modalType === 'publish') {
      if (post.content.trim() === '') return;
      submitPost(e, publish);
    }
    setIsModalOpen(false);
  };

  const submitPost = async (e, publish) => {
    e.preventDefault();
    if (post.content.trim() === '') return;

    try {
      const response = await newBlogPost(
        user,
        post.title,
        post.content,
        publish,
        post.imageURL,
        post.imageAltText,
      );
      setPost({ title: '', content: '', imageURL: '', imageAltText: '' });
      const newPost = response.newPost;
      window.location.href = `/posts/${newPost.id}`;
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const onChange = (e, field) => {
    const { name, value } = e.target;

    setPost((prevPost) => {
      const updatedPost = { ...prevPost, [field]: value };

      // Check if any field is non-empty
      const isAnyFieldFilled = Object.values(updatedPost).some(
        (val) => val !== '',
      );

      // check if errors are populated !!!!

      const areAllFieldsFilled =
        updatedPost.title !== '' &&
        updatedPost.content !== '' &&
        ((updatedPost.imageURL === '' && updatedPost.imageAltText === '') ||
          (updatedPost.imageURL !== '' && updatedPost.imageAltText !== ''));

      // Update button states
      setButtonEnabled((prevEnabled) => ({
        ...prevEnabled,
        discard: isAnyFieldFilled,
        saveOrPublish: areAllFieldsFilled,
      }));

      return updatedPost;
    });

    if (touchedFields[name]) {
      validateField(name, value, post, setFormErrors);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, value, post, setFormErrors);
  };

  // {have user include alt text}

  return (
    <>
      <form className={`${styles.newPostForm} new-post-container`}>
        <div className="form-group">
          <LabelInput
            name="title"
            value={post.title}
            type="text"
            maxLength={100}
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => onChange(e, 'title')}
          ></LabelInput>
        </div>

        <div className={`${styles.editorContainer} editor-container`}>
          <EditorComponent
            content={post.content}
            onContentChange={(newContent) => {
              onChange(
                { target: { value: newContent, name: 'content' } },
                'content',
              );
            }}
            onBlur={() => {
              handleBlur({ target: { name: 'content', value: post.content } });
            }}
          ></EditorComponent>
          <p className="error-message">{formErrors.contentError}</p>
        </div>
        <div className="form-group">
          <LabelInput
            label="Image URL (optional):"
            name="imageURL"
            placeholder="Image URL"
            value={post.imageURL}
            type="text"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => onChange(e, 'imageURL')}
          ></LabelInput>
        </div>

        <div className="form-group" id={styles.imageAltTextFormGroup}>
          <LabelInput
            label="Describe the Image:"
            name="imageAltText"
            placeholder="Image Description"
            value={post.imageAltText}
            type="text"
            maxLength={50}
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => onChange(e, 'imageAltText')}
          ></LabelInput>
        </div>

        <div className={styles.postButtonDiv}>
          <button
            type="button"
            onClick={handleDiscardClick}
            disabled={!buttonEnabled.discard}
            className={`${!buttonEnabled.discard ? styles.disabled : ''} ${styles.discardButton}`}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={(e) => submitPost(e, false)}
            disabled={!buttonEnabled.saveOrPublish}
            className={!buttonEnabled.saveOrPublish ? styles.disabled : ''}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={!buttonEnabled.saveOrPublish}
            className={!buttonEnabled.saveOrPublish ? styles.disabled : ''}
          >
            Publish
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

export default NewPost;
