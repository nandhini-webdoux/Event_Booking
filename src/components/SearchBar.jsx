
import Form from 'react-bootstrap/Form'

function SearchBar({ searchText, onSearchChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        id='event-search'
        name='eventSearch'
        type="text"
        placeholder="Search events by title..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Form.Group>
  )
}

export default SearchBar

  