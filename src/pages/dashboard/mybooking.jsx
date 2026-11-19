
import { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyBooking({ bookings = [], onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

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

  return (
    <div className='booking-container'>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center p-5">
          <h4>No bookings yet!</h4>
          <p>Explore events and book your favourite event.</p>
          <Link to="/dashboard/eventhub" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      ) : (
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Booked Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.eventTitle}</td>
                <td>{booking.eventDate}</td>
                <td>{booking.seats}</td>
                <td>₹{booking.amount}</td>
                <td>{booking.bookedAt}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelClick(booking.id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Cancel Confirmation Popup */}
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to cancel the booking?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

          <Button variant="danger" onClick={handleConfirmCancel}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyBooking;
