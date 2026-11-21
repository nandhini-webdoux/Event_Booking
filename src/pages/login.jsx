
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

  // Clear fields whenever Login page opens
  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
    setFormError('');
    emailRef.current?.focus();
  }, []);

  // Redirect logged-in users
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setFormError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name === 'email' ? 'Email' : 'Password'} is required`
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isLoggedIn = onLogin(
      formData.email,
      formData.password
    );

    if (isLoggedIn) {
      setFormData({
        email: '',
        password: ''
      });
      navigate('/dashboard');
    } else {
      setFormError('Invalid email or password');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-form-section">
          <div className="auth-logo">
            
            
          </div>

          <div className="auth-form-content">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in</p>

            <form onSubmit={handleSubmit} autoComplete="off">

              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                inputRef={emailRef}
                autoComplete="off"
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                autoComplete="new-password"
              />

              {formError && (
                <p className="text-danger">{formError}</p>
              )}

              <button type="submit" className="auth-submit">
                Sign In →
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-footer">
              New here?
              <Link to="/signup"> Create an account</Link>
            </p>
          </div>
        </div>

        <div className="auth-image-section">
          <div className="auth-image-overlay">
            <h1>Welcome to EventHub!</h1>
            <p>
              Discover exciting events, book your tickets
              and create unforgettable memories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
