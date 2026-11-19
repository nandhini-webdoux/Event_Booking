
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/formfield';

function Login({ users, currentUser, onLogin }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  // Focus email input when Login page opens
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Redirect already logged-in user to Dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setFormError('');
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name === 'email' ? 'Email' : 'Password'} is required`
      }));
    }
  };

  // Handle login submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isLoggedIn = onLogin(
      formData.email,
      formData.password
    );

    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setFormError('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          inputRef={emailRef}
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        {formError && (
          <p className="text-danger">{formError}</p>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="text-center mt-3">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
