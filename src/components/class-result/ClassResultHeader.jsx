import { Badge, Card } from "react-bootstrap";

import { faBookOpen, faCalendarAlt, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Component that displays the header for class result section
 * @param {Object} props
 * @param {TClassResult} props.classResult - Grade data object containing enrollment and grade counts
 */
export function ClassResultHeader({ classResult }) {
  return (
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
                  <div className="fs-5">{classResult.instructor}</div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    <span className="fw-semibold">Term</span>
                  </div>
                  <div className="fs-5">{classResult.term}</div>
                </div>
              </div>
              <hr className="text-white-50 my-3" />
              <div className="text-center">
                <h4 className="mb-2">
                  {classResult.subject} {classResult.course_number}
                  <Badge bg="warning" text="dark" className="ms-2">
                    Section {classResult.class_section}
                  </Badge>
                </h4>
                <p className="mb-0 text-white-75">{classResult.course_desc}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
