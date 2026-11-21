
import { useState, useRef } from 'react';

import {
  useParams,
  useNavigate,
  Link,
  useLocation
} from 'react-router-dom';

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaTicketAlt,
  FaArrowLeft
} from 'react-icons/fa';

import styles from './eventdetails.module.css';

function EventDetails({ events, currentUser, onBook, onUpdate }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Existing booking details
  const booking = location.state?.booking;
  const isEdit = location.state?.isEdit === true;

  // Seat count
  const [seats, setSeats] = useState(
    isEdit ? Number(booking?.seats || 1) : 1
  );

  const noteRef = useRef(null);

  // Find selected event
  const selectedEvent = events.find(
    (event) => event.id === Number(id)
  );

  // Include previously booked seats during editing
  const availableSeats = selectedEvent
    ? selectedEvent.seatsLeft +
      (isEdit ? Number(booking?.seats || 0) : 0)
    : 0;

  // Check whether edit data is valid
  if (isEdit && (
    !booking ||
    Number(booking.eventId) !== Number(id)
  )) {
    return (
      <div className={styles.eventPage}>
        <div className={styles.detailsCard}>
          <h3>Booking Details Not Found</h3>

          <p>Please select your booking again.</p>

          <button
            className={styles.bookButton}
            onClick={() => navigate('/dashboard/bookings')}
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  // Event not found
  if (!selectedEvent) {
    return (
      <div className={styles.eventPage}>

        <Link
          to="/dashboard/eventhub"
          className={styles.backButton}
        >
          <FaArrowLeft /> Back to Events
        </Link>

        <div className={styles.detailsCard}>
          <h3>Event Not Found</h3>

          <p>
            The event you are looking for is unavailable.
          </p>
        </div>

      </div>
    );
  }

  // Booking Submit
  const handleBooking = (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const specialNote = noteRef.current.value;

    if (isEdit) {

      // Update existing booking
      const updated = onUpdate(
        booking.id,
        selectedEvent.id,
        Number(seats),
        specialNote
      );

      if (updated === false) {
        return;
      }

    } else {

      // Create new booking
      onBook(
        selectedEvent.id,
        Number(seats),
        specialNote
      );

    }

    // Return to My Bookings
    navigate('/dashboard/bookings');
  };

  return (
    <div className={styles.eventPage}>

      <Link
        to="/dashboard/eventhub"
        className={styles.backButton}
      >
        <FaArrowLeft /> Back to Events
      </Link>

      {/* Page Heading */}
      <div className={styles.pageHeading}>

        <h2>
          {isEdit ? 'Edit Your Booking' : 'Event Details'}
        </h2>

        <p>
          {isEdit
            ? 'Update your event booking and seat selection.'
            : 'Explore the event and reserve your seats.'}
        </p>

      </div>

      <div className={styles.detailsGrid}>

        {/* Event Information */}
        <div className={styles.detailsCard}>

          <div className={styles.cardHeader}>
            <div>

              <span className={styles.categoryBadge}>
                {selectedEvent.category}
              </span>

              <h3>{selectedEvent.title}</h3>

            </div>
          </div>

          <div className={styles.infoList}>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FaCalendarAlt />
              </div>

              <div>
                <small>Event Date</small>
                <p>{selectedEvent.date}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FaMapMarkerAlt />
              </div>

              <div>
                <small>Location</small>
                <p>{selectedEvent.location}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FaTag />
              </div>

              <div>
                <small>Ticket Price</small>
                <p>₹{selectedEvent.price} / seat</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FaTicketAlt />
              </div>

              <div>
                <small>Available Seats</small>
                <p>{availableSeats}</p>
              </div>
            </div>

          </div>

          {availableSeats === 0 && (
            <div className={styles.soldOutMessage}>
              Sorry! This event is sold out.
            </div>
          )}

        </div>

        {/* Booking Form */}
        <div className={styles.bookingCard}>

          <div className={styles.bookingHeader}>

            <h4>
              {isEdit
                ? 'Update Your Tickets'
                : 'Book Your Tickets'}
            </h4>

            <p>
              {isEdit
                ? 'Change your seat selection.'
                : 'Complete the form to reserve your seats.'}
            </p>

          </div>

          {availableSeats > 0 ? (

            <form onSubmit={handleBooking}>

              {/* Number of Seats */}
              <div className={styles.formGroup}>

                <label htmlFor="seats">
                  Number of Seats
                </label>

                <input
                  id="seats"
                  type="number"
                  min="1"
                  max={Math.min(5, availableSeats)}
                  value={seats}
                  onChange={(e) => {
                    setSeats(Number(e.target.value));
                  }}
                  required
                  className={styles.formInput}
                />

                <small>
                  You can book up to 5 seats.
                </small>

              </div>

              {/* Special Note */}
              <div className={styles.formGroup}>

                <label htmlFor="specialNote">
                  Special Note
                </label>

                <textarea
                  id="specialNote"
                  className={styles.formInput}
                  ref={noteRef}
                  defaultValue={booking?.specialNote || ''}
                  placeholder="Enter your special note..."
                  rows="4"
                />

              </div>

              {/* Total Amount */}
              <div className={styles.totalBox}>

                <span>Total Amount</span>

                <strong>
                  ₹{selectedEvent.price * Number(seats)}
                </strong>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.bookButton}
                disabled={
                  !Number.isInteger(Number(seats)) ||
                  Number(seats) < 1 ||
                  Number(seats) > Math.min(5, availableSeats)
                }
              >
                {isEdit
                  ? 'Update Booking'
                  : 'Confirm Booking'}
              </button>

            </form>

          ) : (

            <p className={styles.unavailableText}>
              Booking is currently unavailable for this event.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default EventDetails;
