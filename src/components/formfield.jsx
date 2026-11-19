function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  inputRef
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <input
        type={type}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
      />

      {error && (
        <small className="text-danger">{error}</small>
      )}
    </div>
  );
}

export default FormField;

