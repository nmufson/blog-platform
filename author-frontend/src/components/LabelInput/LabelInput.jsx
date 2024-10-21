import React from 'react';
import PropTypes from 'prop-types';

const LabelInput = ({
  type,
  name,
  value,
  label = null,
  maxLength = undefined,
  placeholder = name,
  onBlur = () => {},
  onChange,
  formErrors,
}) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={onChange}
        className={formErrors[`${name}Error`] ? 'input-error' : ''}
      />
      <p className="error-message">{formErrors[`${name}Error`]}</p>
    </>
  );
};

LabelInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LabelInput;
