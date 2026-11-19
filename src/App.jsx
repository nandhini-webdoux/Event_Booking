
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import MainLayout from './layouts/mainlayouts';
import DashboardLayout from './layouts/dashboardlayout';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import EventDetails from './pages/eventdetails';

import Overview from './pages/dashboard/overview';
import MyBooking from './pages/dashboard/mybooking';
import Profile from './pages/dashboard/profile';

import ProtectedRoute from './components/protectedroute';
import initialEvents from './data/event';

import './App.css';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  });

  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem('events')) || initialEvents;
  });

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [totalBookings, setTotalBookings] = useState(() => {
    return Number(localStorage.getItem('totalBookings')) || 0;
  });

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('users')) || [];
  });

  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem('bookings')) || [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('totalBookings', String(totalBookings));
  }, [totalBookings]);

  
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Login
  const handleLogin = (email, password) => {
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(matchedUser)
      );

      localStorage.setItem('isLoggedIn', 'true');

      return true;
    }

    return false;
  };

  // Signup
  const handleSignup = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return updatedUsers;
    });
  };

  // Simple event booking
  const handleBook = (eventId) => {
    const selectedEvent = events.find(
      (event) => event.id === eventId
    );

    if (!selectedEvent || selectedEvent.seatsLeft <= 0) {
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, seatsLeft: event.seatsLeft - 1 }
          : event
      )
    );

    setTotalBookings((prev) => prev + 1);
  };

  // Event details booking
  const handleEventBooking = (eventId, seats, specialNote) => {
    const selectedEvent = events.find(
      (event) => event.id === eventId
    );

    if (!selectedEvent || selectedEvent.seatsLeft < seats) {
      return;
    }

    const newBooking = {
      id: Date.now(),
      eventId,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      seats,
      amount: selectedEvent.price * seats,
      specialNote,
      bookedAt: new Date().toLocaleString(),
      userEmail: currentUser?.email
    };

    setBookings((prev) => [...prev, newBooking]);

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, seatsLeft: event.seatsLeft - seats }
          : event
      )
    );

    setTotalBookings((prev) => prev + 1);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId) => {
    const bookingToCancel = bookings.find(
      (booking) => booking.id === bookingId
    );

    if (!bookingToCancel) return;

    setBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId)
    );

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === bookingToCancel.eventId
          ? {
              ...event,
              seatsLeft: event.seatsLeft + bookingToCancel.seats
            }
          : event
      )
    );

    setTotalBookings((prev) => Math.max(0, prev - 1));
  };

  // Update profile
  const handleUpdateProfile = (updatedData) => {
    const updatedUser = {
      ...currentUser,
      ...updatedData
    };

    setCurrentUser(updatedUser);

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(updatedUser)
    );

    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.email === updatedUser.email
          ? updatedUser
          : user
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return updatedUsers;
    });
  };

  // Change password
  const handlePasswordChange = (newPassword) => {
    const updatedUser = {
      ...currentUser,
      password: newPassword
    };

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email
        ? updatedUser
        : user
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(updatedUser)
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');

    setCurrentUser(null);
    navigate('/login');
  };

  // Current user's bookings
  const userBookings = bookings.filter(
    (booking) => booking.userEmail === currentUser?.email
  );

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <Login
            users={users}
            currentUser={currentUser}
            onLogin={handleLogin}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup
            users={users}
            onSignup={handleSignup}
          />
        }
      />

      {/* First page */}
      <Route
        path="/"
        element={
          currentUser
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <MainLayout onLogout={handleLogout} />
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >
            {/* Dashboard Overview */}
            <Route
              index
              element={
                <Overview
                  currentUser={currentUser}
                  bookings={userBookings}
                />
              }
            />

            {/* My Bookings */}
            <Route
              path="bookings"
              element={
                <MyBooking
                  bookings={userBookings}
                  onCancel={handleCancelBooking}
                />
              }
            />

            {/* My Profile */}
            <Route
              path="profile"
              element={
                <Profile
                  currentUser={currentUser}
                  onUpdateProfile={handleUpdateProfile}
                  onPasswordChange={handlePasswordChange}
                />
              }
            />

            {/* EventHub */}
            <Route
              path="eventhub"
              element={
                <Home
                  searchText={searchText}
                  onSearchChange={setSearchText}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  filteredEvents={filteredEvents}
                  handleBook={handleBook}
                />
              }
            />

            {/* Event Details */}
            <Route
              path="events/:id"
              element={
                <EventDetails
                  events={events}
                  currentUser={currentUser}
                  onBook={handleEventBooking}
                />
              }
            />
          </Route>
        </Route>
      </Route>

      {/* Invalid URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
