
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import SearchBar from './SearchBar';

function Navbar({ onLogout, searchText, onSearchChange }) {
  return (
    <div className="dashboard-navbar">

      {/* Search Bar */}
      <div className="navbar-search-container">
        <SearchBar
          searchText={searchText}
          onSearchChange={onSearchChange}
        />
      </div>

      {/* Profile Dropdown */}
      <div className="profile-top">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="profile-dropdown"
            className="profile-dropdown-toggle"
          >
            <FaUserCircle size={30} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/dashboard/profile">
              My Profile
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={onLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </div>
  );
}

export default Navbar;
