const LabelInput = ({
  type,
  name,
  value,
  label = null,
  maxLength = undefined,
  placeholder = name,
  onBlur,

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
      />
      <p className="error-message">{formErrors[`${name}Error`]}</p>
    </>
  );
};

export default LabelInput;
