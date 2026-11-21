
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaTicketAlt,
  FaUsers,
  FaRupeeSign,
  FaArrowRight,
  FaCompass,
  FaClipboardList,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa';

import './overview.css';

function Overview({ currentUser, bookings = [] }) {
  const totalBookings = bookings.length;

  const totalSeats = bookings.reduce(
    (total, booking) => total + Number(booking.seats || 0),
    0
  );

  const totalAmount = bookings.reduce(
    (total, booking) => total + Number(booking.amount || 0),
    0
  );

  const upcomingBooking = bookings[0];

  return (
    <div className="overview-page">

      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          {/* <span className="welcome-label">YOUR EVENT DASHBOARD</span> */}

          <h1>
            Welcome back, {currentUser?.name || 'User'}!
          </h1>

          <p>
            Everything you need to manage your event bookings,
            all in one place.
          </p>

          {/* <Link to="/dashboard/eventhub" className="welcome-btn">
            Explore Events <FaArrowRight />
          </Link> */}
        </div>

        {/* <div className="welcome-decoration">
          <FaCalendarCheck />
          <span>EVENTHUB</span>
        </div> */}
      </section>

      {/* Dashboard Statistics */}
      <section className="overview-stats">

        <div className="stat-card">
          <div className="stat-top">
            {/* <div className="stat-icon purple-icon">
              <FaTicketAlt />
            </div>
            <span className="stat-label">Bookings</span> */}
          </div>

          <h2>{totalBookings}</h2>
          <p>Total Bookings</p>

          <Link to="/dashboard/bookings">
            View Bookings <FaArrowRight />
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            {/* <div className="stat-icon blue-icon">
              <FaUsers />
            </div>
            <span className="stat-label">Seats</span> */}
          </div>

          <h2>{totalSeats}</h2>
          <p>Total Seats Booked</p>

          <Link to="/dashboard/bookings">
            View Details <FaArrowRight />
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            {/* <div className="stat-icon orange-icon">
              <FaRupeeSign />
            </div>
            <span className="stat-label">Expenses</span> */}
          </div>

          <h2>₹{totalAmount.toLocaleString('en-IN')}</h2>
          <p>Total Amount Spent</p>

          <Link to="/dashboard/bookings">
            View Details <FaArrowRight />
          </Link>
        </div>

      </section>

      {/* Dashboard Bottom Content */}
      <section className="overview-bottom">

        {/* Upcoming Events */}
        <div className="overview-panel upcoming-panel">

          <div className="panel-heading">
            <div>
              {/* <span className="panel-subtitle">YOUR RESERVATIONS</span> */}
              <h3>Upcoming Events</h3>
            </div>

            <Link to="/dashboard/bookings" className="view-all-link">
              View All <FaArrowRight />
            </Link>
          </div>

          {upcomingBooking ? (
            <div className="upcoming-event">

              

              <div className="event-info">
                

                <h4>{upcomingBooking.eventTitle}</h4>

                <div className="event-details">
                  <span>
                    <FaCalendarAlt />
                    {upcomingBooking.eventDate}
                  </span>

                  <span>
                    <FaUsers />
                    {upcomingBooking.seats} Seats
                  </span>

                  <span>
                    <FaRupeeSign />
                    {Number(upcomingBooking.amount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="empty-bookings">
              <div className="empty-icon">
                <FaTicketAlt />
              </div>

              <h4>No bookings yet!</h4>
              <p>
                You haven't reserved any events.
                Start exploring and make your first booking.
              </p>

              <Link to="/dashboard/eventhub" className="simple-btn">
                Explore Events <FaArrowRight />
              </Link>
            </div>
          )}

        </div>

        {/* Quick Actions */}
        <div className="overview-panel actions-panel">

          <div className="panel-heading">
            <div>
              
              <h3>Quick Actions</h3>
            </div>
          </div>

          <div className="quick-actions">

            <Link to="/dashboard/eventhub" className="action-card">
              

              <div className="action-info">
                <h4>Explore Events</h4>
                
              </div>

              <FaArrowRight className="action-arrow" />
            </Link>

            <Link to="/dashboard/bookings" className="action-card">
              

              <div className="action-info">
                <h4>My Bookings</h4>
                
              </div>

              <FaArrowRight className="action-arrow" />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Overview;
