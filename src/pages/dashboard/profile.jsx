
import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaShieldAlt
} from 'react-icons/fa';

function Profile({ currentUser, onUpdateProfile, onPasswordChange }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setName(currentUser?.name || '');
    setPhone(currentUser?.phone || '');
  }, [currentUser]);

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

    if (Object.keys(newErrors).length > 0) return;

    onUpdateProfile({
      name: name.trim(),
      phone: phone.trim()
    });

    setSuccess('Profile updated successfully!');
  };

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
    <div className="profile-page">

      {/* Page Heading */}
      <div className="profile-page-heading">
        <div>
          {/* <span className="profile-eyebrow">ACCOUNT SETTINGS</span> */}
          <h2>My Profile</h2>
          <p>Manage your personal information and account security.</p>
        </div>

        
      </div>

      {/* Two Column Forms */}
      <div className="profile-grid">

        {/* Personal Information */}
        <Card className="profile-card">
          <div className="profile-card-header personal-header">
            

            <div>
              <h4>Personal Information</h4>
              <p>Update your basic account details</p>
            </div>
          </div>

          <Card.Body>
            {success && (
              <Alert variant="success">{success}</Alert>
            )}

            <Form onSubmit={handleSubmit}>

              <Form.Group className="profile-field">
                <Form.Label>Full Name</Form.Label>
                <div className="profile-input-wrapper">
                  <FaUser className="profile-input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </Form.Group>

              <Form.Group className="profile-field">
                <Form.Label>Email Address</Form.Label>
                <div className="profile-input-wrapper">
                  <FaEnvelope className="profile-input-icon" />
                  <Form.Control
                    type="email"
                    value={currentUser?.email || ''}
                    readOnly
                  />
                </div>
                <small className="profile-hint">
                  Your registered email address cannot be changed here.
                </small>
              </Form.Group>

              <Form.Group className="profile-field">
                <Form.Label>Phone Number</Form.Label>
                <div className="profile-input-wrapper">
                  <FaPhone className="profile-input-icon" />
                  <Form.Control
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </Form.Group>

              <Button type="submit" className="profile-save-btn">
                Save Changes
              </Button>

            </Form>
          </Card.Body>
        </Card>

        {/* Password Settings */}
        <Card className="profile-card">
          <div className="profile-card-header security-header">


            <div>
              <h4>Security Settings</h4>
              <p>Keep your EventHub account secure</p>
            </div>
          </div>

          <Card.Body>

            {passwordMessage && (
              <Alert variant={passwordMessageType}>
                {passwordMessage}
              </Alert>
            )}

            <Form onSubmit={handlePasswordSubmit}>

              {/* Current Password */}
              <Form.Group className="profile-field">
                <Form.Label>Current Password</Form.Label>
                <div className="profile-password-wrapper">
                  <FaLock className="profile-input-icon" />
                  <Form.Control
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="profile-eye-btn"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              {/* New Password */}
              <Form.Group className="profile-field">
                <Form.Label>New Password</Form.Label>
                <div className="profile-password-wrapper">
                  <FaLock className="profile-input-icon" />
                  <Form.Control
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="profile-eye-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="profile-field">
                <Form.Label>Confirm New Password</Form.Label>
                <div className="profile-password-wrapper">
                  <FaLock className="profile-input-icon" />
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="profile-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Form.Group>

              <Button type="submit" className="profile-password-btn">
                Update Password
              </Button>

            </Form>
          </Card.Body>
        </Card>

      </div>
    </div>
  );
}
export default Profile;
