import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

import Link from "next/link";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">
          <span className="text-danger">QC</span>
          <span className="text-dark"> Prof Stat</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/acknowledgments" legacyBehavior passHref>
              <Nav.Link className="nav-link-custom">
                <FontAwesomeIcon icon={faHeart} className="me-1" />
                Acknowledgments
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
