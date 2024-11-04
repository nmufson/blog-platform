import { useState } from 'react';
import DOMPurify from 'dompurify';
import { validateField } from '../../pages/NewPost/NewPostUtils.js';

export const usePostForm = () => {
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

  const [buttonEnabled, setButtonEnabled] = useState({
    discard: false,
    saveOrPublish: false,
  });

  const onChange = (e, field) => {
    const { name, value } = e.target;

    setPost((prevPost) => {
      const updatedPost = { ...prevPost, [field]: DOMPurify.sanitize(value) };

      validateField(name, value, updatedPost, setFormErrors);

      const areAllFieldsFilled = Object.keys(updatedPost).every(
        (field) => updatedPost[field].trim() !== '',
      );

      const areAllFieldsValid = Object.values(formErrors).every(
        (error) => error === '',
      );

      setButtonEnabled({
        discard: Object.values(updatedPost).some(
          (value) => value.trim() !== '',
        ),
        saveOrPublish: areAllFieldsFilled && areAllFieldsValid,
      });

      return updatedPost;
    });
  };

  const resetForm = () => {
    setPost({ title: '', content: '', imageURL: '', imageAltText: '' });
    setButtonEnabled({ discard: false, saveOrPublish: false });
    setFormErrors({
      titleError: '',
      contentError: '',
      imageURLError: '',
      imageAltTextError: '',
    });
  };

  return {
    post,
    formErrors,
    buttonEnabled,
    onChange,
    resetForm,
  };
};
