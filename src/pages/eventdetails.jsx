
import { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EventDetails({ events, currentUser, onBook }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState(1);
  const noteRef = useRef(null);

  const selectedEvent = events.find(
    (event) => event.id === Number(id)
  );

  if (!selectedEvent) {
    return (
      <div className="container mt-4">
        <Link to="/home" className="btn btn-outline-primary mb-3">
          ← Back to Events
        </Link>
        <h2>Event not found</h2>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const specialNote = noteRef.current.value;

    onBook(selectedEvent.id, Number(seats), specialNote);

    navigate('/dashboard/bookings');
  };

  return (
    <div className="container mt-4">

      {/* Back button */}
      <Link
        to="/dashboard/eventhub"
        className="btn btn-outline-primary mb-3"
      >
        ← Back to Events
      </Link>

      <h2>{selectedEvent.title}</h2>

      <p>Category: {selectedEvent.category}</p>
      <p>Date: {selectedEvent.date}</p>
      <p>Location: {selectedEvent.location}</p>
      <p>Price: ₹{selectedEvent.price}</p>
      <p>Available Seats: {selectedEvent.seatsLeft}</p>

      {selectedEvent.seatsLeft === 0 ? (
        <h4>Sorry! This event is sold out.</h4>
      ) : (
        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="form-label">
              Number of Seats
            </label>

            <input
              type="number"
              className="form-control"
              min="1"
              max={Math.min(5, selectedEvent.seatsLeft)}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Special Note
            </label>

            <textarea
              className="form-control"
              ref={noteRef}
              placeholder="Enter your special note"
            />
          </div>

          <h5>
            Total Amount: ₹{selectedEvent.price * Number(seats)}
          </h5>

          <button type="submit" className="btn btn-primary">
            Book Now
          </button>
        </form>
      )}
    </div>
  );
}

export default EventDetails;
