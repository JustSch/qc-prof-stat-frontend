import { Container, Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

const NavbarElement = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>                
                <Navbar.Brand href="/">
                    <text className="qc"> QC </text> 
                    Prof Stat
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/acknowledgments" passHref>
                            <Nav.Link>
                                acknowledgments
                            </Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarElement;