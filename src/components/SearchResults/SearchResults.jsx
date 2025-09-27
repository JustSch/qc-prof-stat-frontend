import { useState } from "react";

import { Alert, Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GRADE_VALUES_TO_LABELS_MAP } from "@lib/utils/class-result";
import { getSortedClassResults, groupClassResultsByInstructor } from "@lib/utils/common";

import { DefaultGrouping } from "./DefaultGrouping";
import { SubgroupedGrouping } from "./SubgroupedGrouping";

/**
 * @param {Object} props
 * @param {TClassResult[]} props.classResults - search results data
 */
export function SearchResults({ classResults }) {
  const [groupingOption, setGroupingOption] = useState("Default");
  const [collapsedInstructors, setCollapsedInstructors] = useState(new Set());
  const [passingThreshold, setPassingThreshold] = useState("C");

  const uniqueInstructors = new Set(classResults.map((result) => result.instructor));
  const allInstructors = [...uniqueInstructors];
  const isAllCollapsed = allInstructors.every((instructor) => collapsedInstructors.has(instructor));

  const sortedClassResults = getSortedClassResults(classResults);
  const defaultGroupedClassResults = groupClassResultsByInstructor(sortedClassResults);

  const passingGradeThresholds = ["C", "C_minus", "D"];
  const groupingOptions = [
    { key: "Default", label: "Default" },
    { key: "Semester", label: "Semester" },
    { key: "Course", label: "Course" },
  ];

  function toggleInstructorCollapse(instructorName) {
    setCollapsedInstructors((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(instructorName)) {
        newSet.delete(instructorName);
      } else {
        newSet.add(instructorName);
      }

      return newSet;
    });
  }

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

  if (classResults.length === 0) {
    return (
      <div className="text-center py-5">
        <Alert variant="info">
          <Alert.Heading>No Results Found</Alert.Heading>
          <p>No class results match your search criteria</p>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <div className="text-muted mb-2">
          <small>
            Found {classResults.length} results from {uniqueInstructors.size} instructor(s)
          </small>
        </div>

        {/* minimum passing grade dropdown */}
        <div className="mb-3">
          <div className="d-flex align-items-center gap-3">
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

      {groupingOption === "Default" && (
        <div className="resultList">
          {Object.entries(defaultGroupedClassResults).map(([instructorName, { classes }]) => (
            <DefaultGrouping
              key={instructorName}
              instructorName={instructorName}
              instructorClasses={classes}
              passingThreshold={passingThreshold}
              isCollapsed={collapsedInstructors.has(instructorName)}
              onToggleCollapse={toggleInstructorCollapse}
            />
          ))}
        </div>
      )}

      {(groupingOption === "Semester" || groupingOption === "Course") && (
        <div className="resultList">
          {Object.entries(defaultGroupedClassResults).map(([instructorName, { classes }]) => (
            <SubgroupedGrouping
              key={instructorName}
              instructorName={instructorName}
              instructorClasses={classes}
              passingThreshold={passingThreshold}
              subGroupType={groupingOption}
              isCollapsed={collapsedInstructors.has(instructorName)}
              onToggleCollapse={toggleInstructorCollapse}
            />
          ))}
        </div>
      )}
    </div>
  );
}
