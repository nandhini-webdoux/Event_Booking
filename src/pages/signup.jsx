
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/formfield';

function Signup({ users, onSignup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear fields whenever Signup page opens
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false
    });
    setErrors({});
    setFormError('');
    setSuccess('');
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must contain at least 3 characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    } else if (
      users.some(
        (user) =>
          user.email.toLowerCase() ===
          formData.email.trim().toLowerCase()
      )
    ) {
      newErrors.email = 'Email already exists';
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least 8 characters, one letter and one number';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone,
      password: formData.password
    };

    const existingUsers =
      JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    onSignup(newUser);

    setSuccess('Account created successfully!');

    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false
    });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-form-section">
          

          <div className="auth-form-content">
            <h2>Create Account</h2>
            <p>Enter your details to get started</p>

            <form onSubmit={handleSubmit} autoComplete="off">

              <FormField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="off"
              />

              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="off"
              />

              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                autoComplete="off"
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
              />

              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />

              <div className="mb-3">
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  {' '}I agree to the Terms and Conditions
                </label>

                {errors.terms && (
                  <div className="text-danger">
                    {errors.terms}
                  </div>
                )}
              </div>

              {formError && (
                <p className="text-danger">{formError}</p>
              )}

              {success && (
                <p className="text-success">{success}</p>
              )}

              <button type="submit" className="auth-submit">
                Create Account →
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-footer">
              Already have an account?
              <Link to="/login"> Sign In</Link>
            </p>
          </div>
        </div>

        <div className="auth-image-section">
          <div className="auth-image-overlay">
            <h1>Join EventHub!</h1>
            <p>
              Discover amazing events, book your tickets
              and make unforgettable memories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
