
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  inputRef,
  autoComplete = "off",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <div className={isPassword ? "password-wrapper" : ""}>
        <input
          ref={inputRef}
          id={name}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default FormField;
