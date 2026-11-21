
import EventCard from './EventCard';
import styles from './eventlist.module.css';

function EventList({ events }) {
  if (events.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h5>No Events Found</h5>
        <p>Try changing your search or filters to find events.</p>
      </div>
    );
  }

  return (
    <div className={styles.eventsGrid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
