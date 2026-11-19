import { Outlet, NavLink } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';

function DashboardLayout() {
  return (
    <Container fluid className="dashboard-container">
      <Row className="g-0">
        <Col md={3} lg={2} className="dashboard-sidebar">
          
          <NavLink
             to="/dashboard"
             end
             className="dashboard-title"
             >
             Dashboard
            </NavLink>
          <Nav className="flex-column gap-0">
            
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

        <Col md={9} lg={10} className="dashboard-content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardLayout;