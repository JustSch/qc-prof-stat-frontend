import { Badge, Card, ListGroup } from "react-bootstrap";

import Link from "next/link";

import { faCalendar, faHashtag, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PercentageDetail } from "@lib/components/PercentageDetail";
import { calculatePassRate } from "@lib/utils/class-result";
import {
  getSectionUrl,
  getSortedClassResults,
  groupClassResultsByInstructor,
} from "@lib/utils/common";

export function SearchResults({ searchResults }) {
  if (!searchResults) return null;

  const sortedClassResults = getSortedClassResults(searchResults);
  const groupedClassResults = groupClassResultsByInstructor(sortedClassResults);

  return (
    <div className="resultList">
      {Object.entries(groupedClassResults).map(([instructorName, instructorData], index) => (
        <Card className="mt-3 mb-3 shadow-sm border-0" key={index}>
          <Card.Header className="bg-light border-0 py-3">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
              <h5 className="mb-0">{instructorName}</h5>
              <Badge bg="secondary" className="ms-auto">
                {instructorData.classes.length} course(s)
              </Badge>
            </div>
          </Card.Header>

          <ListGroup variant="flush">
            {instructorData.classes.map((classItem, index1) => (
              <ListGroup.Item
                key={index1}
                className="border-0 py-3 hover-item"
                style={{ cursor: "pointer" }}
              >
                <Link href={getSectionUrl(classItem)} className="text-decoration-none">
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
                        <PercentageDetail decimal={calculatePassRate(classItem)} type="pass rate" />
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
        </Card>
      ))}
    </div>
  );
}
