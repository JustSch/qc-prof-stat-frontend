import { Card, Col, Container, Row } from "react-bootstrap";

import {
  faDatabase,
  faHandshake,
  faHeart,
  faStar,
  faTint,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  const termLastUpdated = "Summer 2025";

  return (
    <>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">Acknowledgments</h1>
              <p className="lead text-muted">
                This project is made possible by the contributions of amazing people
              </p>
            </div>

            <Row className="g-4">
              <Col md={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div
                        className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <FontAwesomeIcon icon={faWrench} className="text-white" size="lg" />
                      </div>
                    </div>
                    <h5 className="card-title text-primary mb-2">Current Maintainer</h5>
                    <p className="card-text mb-3">
                      <a
                        href="https://www.linkedin.com/in/justin-schreiber/"
                        className="text-decoration-none fw-semibold"
                      >
                        Justin Schreiber
                      </a>
                    </p>
                    <small className="text-muted">Keeping the project alive and updated</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div
                        className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <FontAwesomeIcon icon={faStar} className="text-white" size="lg" />
                      </div>
                    </div>
                    <h5 className="card-title text-success mb-2">Original Creator</h5>
                    <p className="card-text mb-3">
                      <a
                        href="https://www.linkedin.com/in/sabeet/"
                        className="text-decoration-none fw-semibold"
                      >
                        Sabeet A. Chowdhury
                      </a>
                    </p>
                    <small className="text-muted">Founded this project</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div
                        className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <FontAwesomeIcon icon={faHandshake} className="text-white" size="lg" />
                      </div>
                    </div>
                    <h5 className="card-title text-info mb-2">Contributors</h5>
                    <p className="card-text mb-3">
                      <a
                        href="https://github.com/mmonj"
                        className="text-decoration-none fw-semibold"
                      >
                        mmonj
                      </a>{" "}
                      on{" "}
                      <a href="https://github.com" className="text-decoration-none">
                        GitHub
                      </a>
                    </p>
                    <small className="text-muted">Making valuable improvements</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div
                        className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <FontAwesomeIcon icon={faDatabase} className="text-white" size="lg" />
                      </div>
                    </div>
                    <h5 className="card-title text-warning mb-2">Database Status</h5>
                    <p className="card-text mb-3">
                      <span className="fw-semibold">Last Updated:</span>
                      <br />
                      {termLastUpdated}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Plasma donation */}
            <div className="text-center mt-5 p-4 bg-light rounded-3">
              <h4 className="text-danger mb-3">
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Make a Difference
              </h4>
              <p className="mb-3">
                Help save lives by donating blood plasma - it&apos;s a simple way to make a huge
                impact!
              </p>
              <a
                href="https://www.plasmahero.org"
                className="btn btn-danger btn-lg px-4 py-2 text-decoration-none"
              >
                <FontAwesomeIcon icon={faTint} className="me-2" />
                Donate Blood Plasma
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
