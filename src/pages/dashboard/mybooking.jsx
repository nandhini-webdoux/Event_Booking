
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './mybooking.module.css';

function MyBooking({ bookings = [], onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const navigate = useNavigate();

  // Cancel Booking
  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirm(true);
  };

  const handleConfirmCancel = () => {
    onCancel(selectedBookingId);
    setShowConfirm(false);
    setSelectedBookingId(null);
  };

  const handleClose = () => {
    setShowConfirm(false);
    setSelectedBookingId(null);
  };

  // Edit Booking
  const handleEditClick = (booking) => {
    navigate(`/dashboard/events/${booking.eventId}`, {
      state: {
        booking: booking,
        isEdit: true
      }
    });
  };

  return (
    <div className={styles.bookingPage}>

      {/* Page Heading */}
      <div className="profile-page-heading">
        <h2>My Bookings</h2>
        <br />
      </div>

      {/* Booking Table Card */}
      <div className={styles.bookingCard}>

        {bookings.length === 0 ? (
          <div className={styles.emptyState}>
            <br />

            <h4>No Bookings Yet!</h4>

            <p>
              You haven't booked any events yet.
              Explore events and book your favourite one.
            </p>

            <br />

            <Link
              to="/dashboard/eventhub"
              className={styles.browseButton}
            >
              Browse Events <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className={styles.tableWrapper}>

            <Table responsive className={styles.bookingTable}>
              <thead>
                <tr>
                  <th>EVENT</th>
                  <th>DATE</th>
                  <th>SEATS</th>
                  <th>AMOUNT</th>
                  <th>BOOKED TIME</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>

                    <td className={styles.eventName}>
                      <span>{booking.eventTitle}</span>
                    </td>

                    <td>{booking.eventDate}</td>

                    <td>
                      <span className={styles.seatBadge}>
                        {booking.seats}
                      </span>
                    </td>

                    <td className={styles.amount}>
                      ₹{booking.amount}
                    </td>

                    <td>{booking.bookedAt}</td>

                    <td>
                      <div className={styles.actionButtons}>

                        {/* Edit Button */}
                        <Button
                          className={styles.editButton}
                          onClick={() => handleEditClick(booking)}
                        >
                          Edit
                        </Button>

                        {/* Cancel Button */}
                        <Button
                          className={styles.cancelButton}
                          onClick={() =>
                            handleCancelClick(booking.id)
                          }
                        >
                          Cancel
                        </Button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>

          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleClose} centered>

        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          Are you sure you want to cancel this booking?

          <p>This action cannot be undone.</p>
        </Modal.Body>

        <Modal.Footer className={styles.modalFooter}>

          <Button variant="light" onClick={handleClose}>
            Keep Booking
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirmCancel}
          >
            Yes, Cancel
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default MyBooking;
