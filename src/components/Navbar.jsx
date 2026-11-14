import BootstrapNavbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
function Navbar({totalBookings}){
    return(
      <BootstrapNavbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand href="#home" className="fw-bold">
          EventHub
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Text className="text-white fw-semibold">
          Total Bookings: {totalBookings}
        </BootstrapNavbar.Text>
      </Container>
      </BootstrapNavbar>
    )
}
export default Navbar