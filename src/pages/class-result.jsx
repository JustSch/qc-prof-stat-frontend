import { Badge, Card, Container, Row } from "react-bootstrap";

import { useRouter } from "next/router";

import {
  faBookOpen,
  faCalendarAlt,
  faChalkboardTeacher,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ClassResultChart } from "@lib/components/ClassResultChart";
import { ClassResultPlaceholder } from "@lib/components/ClassResultPlaceholder";
import { useClassResult } from "@lib/hooks/useClassResult";

export default function Page() {
  const router = useRouter();

  // query params from the router (instructor, term, subject, course_number, class_section)
  const { data: gradeData, ...classResultFetchState } = useClassResult(router.query);

  return (
    <>
      {classResultFetchState.error && (
        <div className="bg-light min-vh-100">
          <Container className="py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="alert alert-danger border-0 shadow-sm text-center" role="alert">
                  <h4 className="alert-heading text-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Unable to Load Class Data
                  </h4>
                  <p className="mb-0">{classResultFetchState.error}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {classResultFetchState.isLoading && <ClassResultPlaceholder />}

      {gradeData !== null && (
        <div className="bg-light min-vh-100">
          {/* header */}
          <div className="bg-gradient bg-primary text-white py-4 mb-4">
            <Container>
              <div className="text-center">
                <h1 className="display-6 fw-bold mb-3">
                  <FontAwesomeIcon icon={faBookOpen} className="me-3" />
                  Class Grade Analysis
                </h1>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <Card className="bg-white bg-opacity-10 border-0 text-white">
                      <Card.Body>
                        <div className="row text-center">
                          <div className="col-md-6 mb-2">
                            <div className="d-flex align-items-center justify-content-center mb-1">
                              <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                              <span className="fw-semibold">Instructor</span>
                            </div>
                            <div className="fs-5">{gradeData.instructor}</div>
                          </div>
                          <div className="col-md-6 mb-2">
                            <div className="d-flex align-items-center justify-content-center mb-1">
                              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                              <span className="fw-semibold">Term</span>
                            </div>
                            <div className="fs-5">{gradeData.term}</div>
                          </div>
                        </div>
                        <hr className="text-white-50 my-3" />
                        <div className="text-center">
                          <h4 className="mb-2">
                            {gradeData.subject} {gradeData.course_number}
                            <Badge bg="warning" text="dark" className="ms-2">
                              Section {gradeData.class_section}
                            </Badge>
                          </h4>
                          <p className="mb-0 text-white-75">{gradeData.course_desc}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* summary stats cards */}
          <Container className="py-4">
            <Row className="mb-4">
              <div className="col-lg-3 col-md-6 mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center">
                    <FontAwesomeIcon icon={faUsers} className="text-primary fs-1 mb-2" />
                    <h5 className="card-title">Total Enrollment</h5>
                    <h3 className="text-primary mb-0">{gradeData.total_enrollment}</h3>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center">
                    <FontAwesomeIcon icon={faBookOpen} className="text-success fs-1 mb-2" />
                    <h5 className="card-title">Completed Course</h5>
                    <h3 className="text-success mb-0">
                      {gradeData.total_enrollment - gradeData.Withdrawal - gradeData.inc_ng}
                    </h3>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center">
                    <i className="bi bi-arrow-left-circle text-warning fs-1 mb-2"></i>
                    <h5 className="card-title">Withdrawals</h5>
                    <h3 className="text-warning mb-0">{gradeData.Withdrawal}</h3>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center">
                    <i className="bi bi-clock text-info fs-1 mb-2"></i>
                    <h5 className="card-title">Incomplete</h5>
                    <h3 className="text-info mb-0">{gradeData.inc_ng}</h3>
                  </Card.Body>
                </Card>
              </div>
            </Row>

            {/* charts */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 py-3">
                <h4 className="mb-0 text-center">
                  <i className="bi bi-bar-chart-fill text-primary me-2"></i>
                  Grade Distribution Analysis
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <ClassResultChart gradeData={gradeData} />
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
}
