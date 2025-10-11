import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GRADE_VALUES_TO_LABELS_MAP } from "@lib/utils/class-result";

/**
 * @param {Object} props
 * @param {string} props.passingThreshold - Current passing grade threshold
 * @param {Function} props.setPassingThreshold - Function to update passing threshold
 * @param {string} props.groupingOption - Current grouping option
 * @param {Function} props.setGroupingOption - Function to update grouping option
 * @param {Set<string>} props.collapsedInstructors - Set of collapsed instructor names
 * @param {Function} props.setCollapsedInstructors - Function to update collapsed instructors
 * @param {Set<string>} props.uniqueInstructors - Set of all unique instructor names
 */
export function SearchResultControls({
  passingThreshold,
  setPassingThreshold,
  groupingOption,
  setGroupingOption,
  collapsedInstructors,
  setCollapsedInstructors,
  uniqueInstructors,
}) {
  const allInstructors = [...uniqueInstructors];
  const isAllCollapsed = allInstructors.every((instructor) => collapsedInstructors.has(instructor));

  const passingGradeThresholds = ["C", "C_minus", "D"];
  const groupingOptions = [
    { key: "Default", label: "Default" },
    { key: "Semester", label: "Semester" },
    { key: "Course", label: "Course" },
  ];

  function toggleAllInstructors() {
    const allInstructors = [...uniqueInstructors];
    const isAllCollapsed = allInstructors.every((instructor) =>
      collapsedInstructors.has(instructor)
    );

    if (isAllCollapsed) {
      // expand all
      setCollapsedInstructors(new Set());
    } else {
      // collapse all
      setCollapsedInstructors(new Set(allInstructors));
    }
  }

  return (
    <div className="mb-3">
      {/* minimum passing grade dropdown */}
      <div className="mb-3 ">
        <div className="d-flex align-items-center gap-3 ">
          <span className="text-muted">Minimum Passing Grade:</span>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" size="sm" id="threshold-dropdown">
              {GRADE_VALUES_TO_LABELS_MAP[passingThreshold]} or Higher
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {passingGradeThresholds.map((gradeKey) => (
                <Dropdown.Item
                  key={gradeKey}
                  active={passingThreshold === gradeKey}
                  onClick={() => setPassingThreshold(gradeKey)}
                >
                  {GRADE_VALUES_TO_LABELS_MAP[gradeKey]} or Higher
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* collapse and grouping controls */}
      <div className="d-flex flex-wrap align-items-center gap-3">
        <Button variant="outline-primary" size="sm" onClick={toggleAllInstructors}>
          <FontAwesomeIcon icon={isAllCollapsed ? faEye : faEyeSlash} className="me-1" />
          {isAllCollapsed ? "Expand All" : "Collapse All"}
        </Button>

        {/* dropdown for grouping options */}
        <div className="d-flex align-items-center">
          <span className="me-2 text-muted">Group by:</span>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              {groupingOptions.find((option) => option.key === groupingOption)?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {groupingOptions.map((option) => (
                <Dropdown.Item
                  key={option.key}
                  active={groupingOption === option.key}
                  onClick={() => setGroupingOption(option.key)}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
