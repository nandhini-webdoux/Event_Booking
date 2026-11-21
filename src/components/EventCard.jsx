
import Card from 'react-bootstrap/Card';
import Badge from './Badge';
import styles from './EventCard.module.css';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const isSoldOut = event.seatsLeft === 0;
  const isFewSeats = event.seatsLeft > 0 && event.seatsLeft <= 5;

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.badgeRow}>
          <Badge color="#6c63ff">{event.category}</Badge>

          {isSoldOut && <Badge color="#dc3545">Sold Out</Badge>}

          {isFewSeats && (
            <Badge color="#f59e0b">Few seats left</Badge>
          )}
        </div>

        <Card.Title className={styles.eventTitle}>
          {event.title}
        </Card.Title>

        <div className={styles.eventDetails}>
          <p><strong>Date</strong><span>{event.date}</span></p>
          <p><strong>Location</strong><span>{event.location}</span></p>
          <p><strong>Price</strong><span>₹{event.price}</span></p>
          <p>
            <strong>Seats Left</strong>
            <span>{event.seatsLeft}</span>
          </p>
        </div>

        <Link
          to={`/dashboard/events/${event.id}`}
          className={`${styles.bookButton} ${
            isSoldOut ? styles.disabledButton : ''
          }`}
          aria-disabled={isSoldOut}
          onClick={(e) => {
            if (isSoldOut) e.preventDefault();
          }}
        >
          {isSoldOut ? 'Sold Out' : 'Book Now'}
        </Link>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
