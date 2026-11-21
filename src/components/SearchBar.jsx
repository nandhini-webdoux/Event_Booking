
import Form from 'react-bootstrap/Form';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './searchbar.module.css';

function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className={styles.searchWrapper}>
      <FaSearch className={styles.searchIcon} />

      <Form.Control
        id="event-search"
        name="eventSearch"
        type="text"
        placeholder="Search events by title..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />

      {searchText && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
