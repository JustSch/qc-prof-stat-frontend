import { useState } from "react";

import { Alert, ButtonGroup, Dropdown } from "react-bootstrap";

import { DefaultGrouping } from "./DefaultGrouping";
import { SubgroupedGrouping } from "./SubgroupedGrouping";

/**
 * @param {Object} props
 * @param {TClassResult[]} props.classResults - search results data
 * @param {TGradeKey} props.passingThreshold - passing grade threshold
 */
export function SearchResults({ classResults, passingThreshold }) {
  const [groupingOption, setGroupingOption] = useState("Default");
  const [collapsedInstructors, setCollapsedInstructors] = useState(new Set());

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

  const uniqueInstructors = new Set(classResults.map((result) => result.instructor));

  const groupingOptions = [
    { key: "Default", label: "Default" },
    { key: "Semester", label: "Semester" },
    { key: "Course", label: "Course" },
  ];

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="text-muted">
          <small>
            Found {classResults.length} result{classResults.length === 1 ? "" : "s"} from{" "}
            {uniqueInstructors.size} instructor{uniqueInstructors.size === 1 ? "" : "s"}
          </small>
        </div>

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

      {groupingOption === "Default" && (
        <DefaultGrouping
          classResults={classResults}
          passingThreshold={passingThreshold}
          collapsedInstructors={collapsedInstructors}
          onToggleCollapse={toggleInstructorCollapse}
        />
      )}

      {(groupingOption === "Semester" || groupingOption === "Course") && (
        <SubgroupedGrouping
          classResults={classResults}
          passingThreshold={passingThreshold}
          subGroupType={groupingOption}
          collapsedInstructors={collapsedInstructors}
          onToggleCollapse={toggleInstructorCollapse}
        />
      )}
    </div>
  );
}
