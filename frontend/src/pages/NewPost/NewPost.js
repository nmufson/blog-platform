export const validateField = (name, value, post, setFormErrors) => {
  let updatedErrors = {
    titleError: '',
    contentError: '',
    imageURLError: '',
    imageAltTextError: '',
  };

  switch (name) {
    case 'title':
      updatedErrors = validateTitle(value);
      break;

    case 'content':
      updatedErrors = validateContent(value);
      break;

    case 'imageURL':
      updatedErrors = validateImageURL(value, post);
      break;

    case 'imageAltText':
      updatedErrors = validateImageAltText(value, post);
      break;

    default:
      break;
  }

  setFormErrors((prevErrors) => ({
    ...prevErrors,
    ...updatedErrors,
  }));
};

const validateTitle = (value) => {
  const updatedErrors = { titleError: '' };

  if (!value) {
    updatedErrors.titleError = 'Title cannot be blank';
  } else if (value.length < 5) {
    updatedErrors.titleError = 'Title must be at least 5 characters';
  } else if (value.length === 100) {
    updatedErrors.titleError = 'Title cannot be more than 100 characters';
  }

  return updatedErrors;
};

const validateContent = (value) => {
  const updatedErrors = { contentError: '' };

  if (!value) {
    updatedErrors.contentError = 'Content cannot be blank';
  } else if (value.length < 200) {
    updatedErrors.contentError = 'Post must be at least 200 characters';
  }

  return updatedErrors;
};

const validateImageURL = (value, post) => {
  const updatedErrors = { imageURLError: '' };

  if (!value) {
    updatedErrors.imageURLError = 'Image URL cannot be blank';
  } else if (!post.imageAltText && !value) {
    updatedErrors.imageURLError = '';
    updatedErrors.imageAltTextError = '';
  } else {
    // Regular expression to validate URL
    const urlPattern = new RegExp(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(\?.*)?$/i,
    );
    if (!urlPattern.test(value)) {
      updatedErrors.imageURLError = 'Please enter a valid image URL';
    }
  }

  return updatedErrors;
};

const validateImageAltText = (value, post) => {
  const updatedErrors = { imageAltTextError: '' };

  if (!value) {
    updatedErrors.imageAltTextError = 'Alt text cannot be blank';
  } else if (value.length === 50) {
    updatedErrors.imageAltTextError =
      'Alt text cannot be more than 50 characters';
  } else if (!post.imageURL && !value) {
    updatedErrors.imageAltTextError = '';
    updatedErrors.imageURLError = '';
  }

  return updatedErrors;
};
