
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Navbar from '../components/Navbar';

function DashboardLayout({ currentUser,onLogout, searchText,onSearchChange }) {
  const location = useLocation();

  const isEventHub = location.pathname === '/dashboard/eventhub';

  return (
    <Container fluid className="dashboard-container">
      <Row className="g-0">

        {/* Sidebar */}
        <Col md={3} lg={2} className="dashboard-sidebar">
          <div className="sidebar-brand">
            EventHub
          </div>

          <Nav className="flex-column dashboard-nav">
            <Nav.Link as={NavLink} to="/dashboard" end>
              Dashboard
            </Nav.Link>

            <Nav.Link as={NavLink} to="/dashboard/eventhub">
              EventHub
            </Nav.Link>

            <Nav.Link as={NavLink} to="/dashboard/bookings">
              My Bookings
            </Nav.Link>

            <Nav.Link as={NavLink} to="/dashboard/profile">
              My Profile
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col
          md={9}
          lg={10}
          className={`dashboard-content ${
            isEventHub ? 'eventhub-scroll' : ''
          }`}
        >
          <div className="dashboard-top">
            <Navbar
            currentUser={currentUser} 
            onLogout={onLogout} />
          </div>

          <Outlet />
        </Col>

      </Row>
    </Container>
  );
}

export default DashboardLayout;
