import { Container } from 'react-bootstrap';
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EventList from "../components/EventList";

function Home({
  searchText,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  filteredEvents,
  handleBook
}) {
  return (
    <Container className="pb-5">
      <SearchBar
        searchText={searchText}
        onSearchChange={onSearchChange}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <EventList
        events={filteredEvents}
        onBook={handleBook}
      />
    </Container>
  );
}

export default Home;
