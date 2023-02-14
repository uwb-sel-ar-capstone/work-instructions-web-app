import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import selImage from "../images/SELLogo.png";

function NavBar() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="">
          <img
            src={selImage}
            height="30rem"
            className="d-inline-block align-top"
            alt="SEL Logo"
          ></img>
          Work Instructions Design Tool
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">WI List</Nav.Link>
            <Nav.Link href="editor">Create New</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
