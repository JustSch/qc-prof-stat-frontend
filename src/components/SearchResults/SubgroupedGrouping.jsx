import { Badge, Card, Collapse, ListGroup } from "react-bootstrap";

import Link from "next/link";

import {
  faBookOpen,
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
 * group classes by semester
 * @param {TClassResult[]} classes - array of class result objects
 * @returns {Record<string, TClassResult[]>} - mapping of: semester name -> class result objects
 */
function groupClassesBySemester(classes) {
  const grouped = {};
  for (const classItem of classes) {
    const semester = classItem.term;
    if (!grouped[semester]) {
      grouped[semester] = [];
    }
    grouped[semester].push(classItem);
  }

  return grouped;
}

/**
 * group classes by subject + course_number
 * @param {TClassResult[]} classes - array of class result objects
 * @returns {Record<string, TClassResult[]>} - mapping of: course name -> class result objects
 */
function groupClassesByCourse(classes) {
  const grouped = {};
  for (const classItem of classes) {
    const course = `${classItem.subject} ${classItem.course_number}`;
    if (!grouped[course]) {
      grouped[course] = [];
    }
    grouped[course].push(classItem);
  }

  const sortedGrouped = {};
  // natsort in reverse order (b, a) so higher level courses appear on top of list
  const sortedKeys = Object.keys(grouped).toSorted((a, b) =>
    new Intl.Collator("en", { numeric: true }).compare(b, a)
  );
  for (const key of sortedKeys) {
    sortedGrouped[key] = grouped[key];
  }

  return sortedGrouped;
}

/**
 * Subgrouped grouping component that displays class results for a single instructor, grouped by semester or course
 * @param {Object} props
 * @param {string} props.instructorName - instructor name
 * @param {TClassResult[]} props.instructorClasses - class results for the instructor
 * @param {string[]} props.uniqueCourses - unique courses taught by the instructor
 * @param {TGradeKey} props.passingThreshold - passing grade threshold
 * @param {"Semester" | "Course"} props.subGroupType - type of subgrouping
 * @param {boolean} props.isCollapsed - whether instructor section is collapsed
 * @param {function(string): void} props.onToggleCollapse - function to toggle instructor collapse
 */
export function SubgroupedGrouping({
  instructorName,
  instructorClasses,
  uniqueCourses,
  passingThreshold,
  subGroupType,
  isCollapsed,
  onToggleCollapse,
}) {
  if (instructorClasses.length === 0) return null;

  function getSubGroupIcon() {
    return subGroupType === "Semester" ? faCalendar : faBookOpen;
  }

  /**
   * @param {TClassResult[]} classes - array of class result objects
   * @returns {Record<string, TClassResult[]>} - mapping of: subgroup name -> class result objects
   */
  function getSubGroups(classes) {
    return subGroupType === "Semester"
      ? groupClassesBySemester(classes)
      : groupClassesByCourse(classes);
  }

  const subGroups = getSubGroups(instructorClasses);

  return (
    <Card
      className="mt-3 mb-3 border-0"
      style={{
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Card.Header
        className="bg-primary bg-opacity-10 border-0 py-3"
        style={{
          cursor: "pointer",
          position: "sticky",
          top: "0",
          zIndex: 10,
          backdropFilter: "blur(8px)",
        }}
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
        <div className="p-0">
          {uniqueCourses && uniqueCourses.length > 0 && (
            <div className="px-3 py-2 bg-light bg-opacity-25 border-bottom">
              <div className="text-muted small">
                <strong>Courses:</strong> {uniqueCourses.join(", ")}
              </div>
            </div>
          )}
          {Object.entries(subGroups).map(([subGroupName, subGroupClasses], idx2) => (
            <div
              key={idx2}
              className={
                uniqueCourses && uniqueCourses.length > 0
                  ? "border-bottom"
                  : "border-bottom border-top"
              }
            >
              <div className="bg-light bg-opacity-50 px-3 py-2 border-bottom">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={getSubGroupIcon()} className="text-secondary me-2" />
                  <h6 className="mb-0 text-secondary">{subGroupName}</h6>
                  <Badge bg="light" text="dark" className="ms-auto">
                    {subGroupClasses.length} section(s)
                  </Badge>
                </div>
              </div>

              <ListGroup variant="flush">
                {subGroupClasses.map((classItem, idx3) => (
                  <ListGroup.Item
                    key={idx3}
                    className="border-0 py-3 hover-item"
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      href={buildClassResultPageUrl(classItem)}
                      className="text-decoration-none"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1 text-dark">
                            {classItem.subject} {classItem.course_number}
                            <span
                              className="text-muted ms-2"
                              style={{ fontWeight: "normal", fontSize: "0.9em" }}
                            >
                              - {classItem.course_desc}
                            </span>
                          </h6>
                          <div className="text-muted small">
                            <FontAwesomeIcon icon={faHashtag} className="me-1" />
                            Section {classItem.class_section}
                            {subGroupType !== "Semester" && (
                              <>
                                <span className="mx-2">•</span>
                                <FontAwesomeIcon icon={faCalendar} className="me-1" />
                                {classItem.term}
                              </>
                            )}
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
        </div>
      </Collapse>
    </Card>
  );
}
