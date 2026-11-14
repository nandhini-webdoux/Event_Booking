
import EventCard from './EventCard'

function EventList({ events, onBook }) {
  if (events.length === 0) {
    return (
      <p className="text-center text-muted fs-5 my-5">
        No events found. Try a different search.
      </p>
    )
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onBook={onBook} />
      ))}
    </div>
  )
}

export default EventList
