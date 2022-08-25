/* eslint-disable jsx-a11y/anchor-is-valid */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NomadNavBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand href="#home">Nomadicity</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link href="#">Home</Nav.Link>
            </Link>
            <Link passHref href="/boards">
              <Nav.Link href="#">Boards</Nav.Link>
            </Link>
            <Link passHref href="/hikes">
              <Nav.Link href="#">Hikes</Nav.Link>
            </Link>
            <NavDropdown title="Create" id="basic-nav-dropdown">
              <Link passHref href="/board/new">
                <NavDropdown.Item href="#action/3.1">Create Board</NavDropdown.Item>
              </Link>
              <Link passHref href="/hike/new">
                <NavDropdown.Item href="#action/3.2">
                  Create Hike
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NomadNavBar;
