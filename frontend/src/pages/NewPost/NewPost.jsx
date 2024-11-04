import { useOutletContext, useNavigate } from 'react-router-dom';
import { usePostForm } from '../../hooks/usePostForm/usePostForm';
import { useModal } from '../../hooks/useModal/useModal';
import { newBlogPost } from '../../services/blogPostService.js';
import LabelInput from '../../components/LabelInput/LabelInput.jsx';
import EditorComponent from '../../components/EditorComponent/EditorComponent.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import styles from './NewPost.module.css';

const NewPost = () => {
  const { post, formErrors, buttonEnabled, onChange, resetForm } =
    usePostForm();
  const { isModalOpen, modalType, openModal, closeModal } = useModal();
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const handleDiscardClick = () => openModal('discard');
  const handleSubmitClick = () => openModal('publish');

  const handleConfirm = async (e, publish) => {
    if (modalType === 'discard') {
      resetForm();
    } else if (modalType === 'publish') {
      await submitPost(e, publish);
    }
    closeModal();
  };

  const submitPost = async (e, publish) => {
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
      resetForm();

      const newPost = response.newPost;
      navigate(`/posts/${newPost.id}`);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

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
        closeModal={closeModal}
        confirmText={modalType === 'discard' ? 'Discard' : 'Publish'}
      />
    </>
  );
};

export default NewPost;
