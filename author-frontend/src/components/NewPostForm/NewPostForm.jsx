import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NewPostForm = () => {
  const [postDraft, setPostDraft] = useState('');

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleCancel = () => {};
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.postForm}>
        <textarea
          value={postDraft}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Leave a comment..."
        />
        <div
          className={`${styles.postButtonDiv} ${isFocused ? styles.visible : ''}`}
        >
          // ask if they want to save draft
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={`${postDraft === '' ? styles.disabled : ''}`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
