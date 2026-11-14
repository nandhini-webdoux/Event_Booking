import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import initialEvents from './data/event'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import EventList from './components/EventList'
import './App.css'

function App() {
  const [events, setEvents] = useState(initialEvents)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [totalBookings, setTotalBookings] = useState(0)

  const handleBook = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId && event.seatsLeft > 0
          ? { ...event, seatsLeft: event.seatsLeft - 1 }
          : event
      )
    )
    setTotalBookings((prev) => prev + 1)
  }

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchText.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="app-wrapper">
      <Navbar totalBookings={totalBookings} />
      <Container className="pb-5">
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <EventList events={filteredEvents} onBook={handleBook} />
      </Container>
    </div>
  )
}

export default App
