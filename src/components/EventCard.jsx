
import Card from 'react-bootstrap/Card';
import Badge from './Badge';
import styles from './EventCard.module.css';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const isSoldOut = event.seatsLeft === 0;
  const isFewSeats = event.seatsLeft > 0 && event.seatsLeft <= 5;

  return (
    <Card className={styles.card}>
      <Card.Body className="d-flex flex-column">
        <div className={styles.badgeRow}>
          <Badge color="#0d6efd">{event.category}</Badge>

          {isSoldOut && <Badge color="red">Sold Out</Badge>}

          {isFewSeats && (
            <Badge color="orange">Few seats left</Badge>
          )}
        </div>

        <Card.Title className="fw-bold">
          {event.title}
        </Card.Title>

        <Card.Text className="text-muted mb-1">
          <strong>Date:</strong> {event.date}
        </Card.Text>

        <Card.Text className="text-muted mb-1">
          <strong>Location:</strong> {event.location}
        </Card.Text>

        <Card.Text className="text-muted mb-1">
          <strong>Price:</strong> ₹{event.price}
        </Card.Text>

        <Card.Text className="mb-3">
          <strong>Seats Left:</strong> {event.seatsLeft}
        </Card.Text>

        <Link
          to={`/dashboard/events/${event.id}`}
          className="btn btn-primary mt-auto"
        >
          Book Now
        </Link>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
