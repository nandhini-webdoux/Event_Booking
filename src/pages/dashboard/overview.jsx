import { Card, Row, Col } from 'react-bootstrap';

function Overview({ currentUser, bookings = [] }) {
  const totalBookings = bookings.length;

  const totalSeats = bookings.reduce(
    (total, booking) => total + booking.seats,
    0
  );

  const totalAmount = bookings.reduce(
    (total, booking) => total + booking.amount,
    0
  );

  return (
    <div>
      <h2>Welcome, {currentUser?.name}!</h2>
      <p>Here is your event booking summary.</p>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="p-3 mb-3 shadow-sm">
            <h5>Total Bookings</h5>
            <h2>{totalBookings}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 mb-3 shadow-sm">
            <h5>Total Seats Booked</h5>
            <h2>{totalSeats}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 mb-3 shadow-sm">
            <h5>Total Amount Spent</h5>
            <h2>₹{totalAmount}</h2>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;