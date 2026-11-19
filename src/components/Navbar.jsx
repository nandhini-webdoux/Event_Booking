
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar({ onLogout }) {
  return (
    <BootstrapNavbar bg="dark" variant="dark" className="navbar-custom">
    <Container fluid className="px-4">
    <BootstrapNavbar.Brand
      as={Link}
      to="/dashboard/eventhub"
      className="fw-bold"
    >
      EventHub
    </BootstrapNavbar.Brand>

    <Dropdown align="end">
      <Dropdown.Toggle variant="dark" id="profile-dropdown" className="border-0">
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
    </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
