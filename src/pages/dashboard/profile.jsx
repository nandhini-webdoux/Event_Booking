import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Profile({ currentUser, onUpdateProfile, onPasswordChange }) {
  // Profile states
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState('');

  // Eye icon states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update form when user details change
  useEffect(() => {
    setName(currentUser?.name || '');
    setPhone(currentUser?.phone || '');
  }, [currentUser]);

  // Update profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = 'Name must contain at least 3 characters';
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    setSuccess('');

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onUpdateProfile({
      name: name.trim(),
      phone: phone.trim()
    });

    setSuccess('Profile updated successfully!');
  };

  // Change password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    setPasswordMessage('');
    setPasswordMessageType('');

    if (currentPassword !== currentUser?.password) {
      setPasswordMessage('Current password is incorrect.');
      setPasswordMessageType('danger');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage('New password must contain at least 6 characters.');
      setPasswordMessageType('danger');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('New password and confirm password do not match.');
      setPasswordMessageType('danger');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordMessage('New password must be different from current password.');
      setPasswordMessageType('danger');
      return;
    }

    onPasswordChange(newPassword);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setPasswordMessage('Password changed successfully!');
    setPasswordMessageType('success');
  };

  return (
    <div className="profile-container">

      {/* Profile Information */}
      <Card className="p-4 shadow-sm mb-4">
        <h2 className="mb-2">My Profile</h2>

        <p className="text-muted">
          View and update your personal information.
        </p>

        {success && (
          <Alert variant="success">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <small className="text-danger">
                {errors.name}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>

            <Form.Control
              type="email"
              value={currentUser?.email || ''}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>

            <Form.Control
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {errors.phone && (
              <small className="text-danger">
                {errors.phone}
              </small>
            )}
          </Form.Group>

          <Button type="submit" variant="primary">
            Save Changes
          </Button>

        </Form>
      </Card>

      {/* Change Password */}
      <Card className="p-4 shadow-sm">
        <h3 className="mb-2">Change Password</h3>

        <p className="text-muted">
          Update your account password.
        </p>

        {passwordMessage && (
          <Alert variant={passwordMessageType}>
            {passwordMessage}
          </Alert>
        )}

        <Form onSubmit={handlePasswordSubmit}>

          {/* Current Password */}
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>

            <div className="input-group">
              <Form.Control
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>

            <div className="input-group">
              <Form.Control
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowNewPassword(!showNewPassword)
                }
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>

            <div className="input-group">
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Password
          </Button>

        </Form>
      </Card>

    </div>
  );
}

export default Profile;