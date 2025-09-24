import { Badge, Card, Col, Container, Row } from "react-bootstrap";

import Head from "next/head";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCode, faDatabase, faHandHoldingHeart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  const termLastUpdated = "Summer 2025";

  const teamMembers = [
    {
      role: "Current Maintainer",
      name: "Justin Schreiber",
      link: "https://www.linkedin.com/in/justin-schreiber/",
      icon: faLinkedin,
      description: "Keeping the project running smoothly",
    },
    {
      role: "Original Creator",
      name: "Sabeet A. Chowdhury",
      link: "https://www.linkedin.com/in/sabeet/",
      icon: faLinkedin,
      description: "Founded this project",
    },
    {
      role: "Contributor",
      name: "mmonj",
      link: "https://github.com/mmonj",
      icon: faGithub,
      description: "Enhanced features and functionality",
    },
  ];

  return (
    <>
      <Head>
        <title>Acknowledgments - QC Prof Stat</title>
        <meta name="description" content="Meet the team behind QC Prof Stat" />
      </Head>

      <div className="bg-gradient py-5 mb-4">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Acknowledgments</h1>
            <p className="lead mb-0">
              This project is made possible by the contributions of amazing people
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* contributors */}
        <Row className="mb-4">
          <Col>
            <h2 className="text-center mb-4 text-primary">
              <FontAwesomeIcon icon={faCode} className="me-2" />
              Our Team
            </h2>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {teamMembers.map((member, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={member.icon} className="text-primary mb-2" size="2x" />
                  </div>
                  <Badge bg="primary" className="mb-2">
                    {member.role}
                  </Badge>
                  <Card.Title className="h5 mb-2">
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-dark hover-link"
                    >
                      {member.name}
                    </a>
                  </Card.Title>
                  <Card.Text className="text-muted">{member.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* project info */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm bg-light">
              <Card.Body className="text-center py-4">
                <FontAwesomeIcon icon={faDatabase} className="text-success mb-3" size="2x" />
                <h4 className="text-primary mb-2">Latest Update</h4>
                <p className="mb-0">
                  Database last updated with <Badge bg="success">{termLastUpdated}</Badge> data
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* plasma donation */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Card
              className="border-0 shadow-sm"
              style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)" }}
            >
              <Card.Body className="text-white py-4">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="mb-3" size="2x" />
                <h4 className="mb-3">Make a Difference</h4>
                <p className="mb-3">
                  Help save lives by donating blood plasma - it&apos;s a simple way to make a huge
                  impact!
                </p>
                <a
                  href="https://www.plasmahero.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light btn-lg fw-semibold"
                  style={{ color: "#ee5a52" }}
                >
                  <FontAwesomeIcon icon={faHeart} className="me-2" />
                  Consider Donating Blood Plasma
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
