import { Badge, Card, ListGroup } from "react-bootstrap";

import Link from "next/link";

import { faCalendar, faHashtag, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PercentageDetail } from "@lib/components/PercentageDetail";
import { computePassingRate } from "@lib/utils/class-result";
import { buildClassResultPageUrl } from "@lib/utils/url-builder";

// Function to group classes within an instructor's classes
function groupInstructorClasses(classes, groupBy) {
  const grouped = {};
  for (const classItem of classes) {
    let key;
    if (groupBy === "semester") {
      key = classItem.term;
    } else if (groupBy === "course") {
      key = `${classItem.subject} ${classItem.course_number}`;
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(classItem);
  }

  return grouped;
}

/**
 * Component that renders instructor classes with sub-grouping
 * @param {Object} props
 * @param {string} props.instructorName - Name of the instructor
 * @param {TClassResult[]} props.instructorClasses - Array of class results for this instructor
 * @param {string} props.groupingOption - How to group classes ("semester" or "course")
 * @param {TGradeKey} props.passingThreshold - Passing grade threshold
 * @param {number} props.cardKey - Key for the card component
 */
export function SubGroupedInstructorCard({
  instructorName,
  instructorClasses,
  groupingOption,
  passingThreshold,
  cardKey,
}) {
  const subGroups = groupInstructorClasses(instructorClasses, groupingOption);

  return (
    <Card className="mt-3 mb-3 shadow-sm border-0" key={cardKey}>
      <Card.Header className="bg-light border-0 py-3">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
          <h5 className="mb-0">{instructorName}</h5>
          <Badge bg="secondary" className="ms-auto">
            {instructorClasses.length} section(s)
          </Badge>
        </div>
      </Card.Header>

      {Object.entries(subGroups).map(([subGroupName, subGroupClasses], subIdx) => (
        <div key={subIdx}>
          <div className="bg-light px-3 py-2 border-bottom">
            <h6 className="mb-0 text-muted">{subGroupName}</h6>
          </div>

          <ListGroup variant="flush">
            {subGroupClasses.map((classItem, idx2) => (
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
      ))}
    </Card>
  );
}
