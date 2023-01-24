/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function NomadNavBar() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Nomadicity</Navbar.Brand>
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
              <Link passHref href="/boards/new">
                <NavDropdown.Item href="#action/3.1">Create Board</NavDropdown.Item>
              </Link>
              <Link passHref href="/hikes/new">
                <NavDropdown.Item href="#action/3.2">
                  Create Hike
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <img src={user.profile_image_url} className="round-circle" alt="user profile pic" />
      <Button className="signOutBtn btn-med copy-btn" type="button" onClick={signOut}>
        Sign Out
      </Button>
    </Navbar>
  );
}

export default NomadNavBar;
