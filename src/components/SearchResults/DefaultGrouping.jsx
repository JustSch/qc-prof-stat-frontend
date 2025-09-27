import { Badge, Card, Collapse, ListGroup } from "react-bootstrap";

import Link from "next/link";

import {
  faCalendar,
  faChevronDown,
  faChevronRight,
  faHashtag,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PercentageDetail } from "@lib/components/PercentageDetail";
import { computePassingRate } from "@lib/utils/class-result";
import { buildClassResultPageUrl } from "@lib/utils/url-builder";

/**
 * Component for displaying class results for a single instructor
 * @param {Object} props
 * @param {string} props.instructorName - instructor name
 * @param {TClassResult[]} props.instructorClasses - class results for the instructor
 * @param {string[]} props.uniqueCourses - unique courses taught by the instructor
 * @param {TGradeKey} props.passingThreshold - passing grade threshold
 * @param {boolean} props.isCollapsed - whether instructor section is collapsed
 * @param {function(string): void} props.onToggleCollapse - function to toggle instructor collapse
 */
export function DefaultGrouping({
  instructorName,
  instructorClasses,
  uniqueCourses,
  passingThreshold,
  isCollapsed,
  onToggleCollapse,
}) {
  if (!instructorClasses) return null;

  return (
    <Card className="mt-3 mb-3 shadow-sm border-0">
      <Card.Header
        className="bg-primary bg-opacity-10 border-0 py-3"
        style={{ cursor: "pointer" }}
        onClick={() => onToggleCollapse(instructorName)}
      >
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={isCollapsed ? faChevronRight : faChevronDown}
            className="text-primary me-2"
          />
          <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
          <h5 className="mb-0 text-primary">{instructorName}</h5>
          <Badge bg="primary" className="ms-auto">
            {instructorClasses.length} section(s)
          </Badge>
        </div>
      </Card.Header>

      <Collapse in={!isCollapsed}>
        <div>
          {uniqueCourses && uniqueCourses.length > 0 && (
            <div className="px-3 py-2 bg-light bg-opacity-25 border-bottom">
              <div className="text-muted small">
                <strong>Courses:</strong> {uniqueCourses.join(", ")}
              </div>
            </div>
          )}
          <ListGroup variant="flush">
            {instructorClasses.map((classItem, idx2) => (
              <ListGroup.Item
                key={idx2}
                className="border-0 py-3 hover-item"
                style={{ cursor: "pointer" }}
              >
                <Link href={buildClassResultPageUrl(classItem)} className="text-decoration-none">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 text-dark">
                        {classItem.subject} {classItem.course_number}
                        {classItem.course_desc && (
                          <span
                            className="text-muted ms-2"
                            style={{ fontWeight: "normal", fontSize: "0.9em" }}
                          >
                            - {classItem.course_desc}
                          </span>
                        )}
                      </h6>
                      <div className="text-muted small">
                        <FontAwesomeIcon icon={faHashtag} className="me-1" />
                        Section {classItem.class_section}
                        <span className="mx-2">•</span>
                        <FontAwesomeIcon icon={faCalendar} className="me-1" />
                        {classItem.term}
                        <span className="mx-2">•</span>
                        <FontAwesomeIcon icon={faUsers} className="me-1" />
                        {classItem.total_enrollment} students
                      </div>
                      <div className="mt-1">
                        <PercentageDetail
                          decimal={computePassingRate(classItem, passingThreshold)}
                          type="Passing Rate"
                        />
                      </div>
                    </div>
                    <div className="text-primary">
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Collapse>
    </Card>
  );
}
