import { useState } from 'react';
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
  const [success, setSuccess] = useState('');

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
        (user) => user.email.toLowerCase() === formData.email.trim().toLowerCase()
      )
    ) {
      newErrors.email = 'Email already exists';
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      newErrors.password = 'Password must contain at least 8 characters, one letter and one number';
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

  setTimeout(() => {
    navigate('/login');
  }, 1500);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h2 className="text-center mb-4">Create Account</h2>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <FormField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="mb-3">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label className="ms-2">
            I agree to the Terms and Conditions
          </label>
          {errors.terms && (
            <small className="text-danger d-block">
              {errors.terms}
            </small>
          )}
        </div>

        {success && (
          <p className="text-success">{success}</p>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;


