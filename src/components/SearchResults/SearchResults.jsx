import { Alert } from "react-bootstrap";

import { getSortedClassResults, groupClassResultsByInstructor } from "@lib/utils/common";

import { DefaultGrouping } from "./DefaultGrouping";
import { SearchResultControls } from "./SearchResultControls";
import { SubgroupedGrouping } from "./SubgroupedGrouping";

/**
 * @param {Object} props
 * @param {TClassResult[]} props.classResults - search results data
 * @param {string} props.passingThreshold - Current passing grade threshold
 * @param {Function} props.setPassingThreshold - Passing threshold setter
 * @param {string} props.groupingOption - Current grouping option
 * @param {Function} props.setGroupingOption - Grouping option setter
 * @param {Set<string>} props.collapsedInstructors - Set of collapsed instructor names
 * @param {Function} props.setCollapsedInstructors - Collapsed instructors setter
 */
export function SearchResults({
  classResults,
  passingThreshold,
  setPassingThreshold,
  groupingOption,
  setGroupingOption,
  collapsedInstructors,
  setCollapsedInstructors,
}) {
  const uniqueInstructors = new Set(classResults.map((result) => result.instructor));

  const sortedClassResults = getSortedClassResults(classResults);
  const defaultGroupedClassResults = groupClassResultsByInstructor(sortedClassResults);

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

  return (
    <div>
      <SearchResultControls
        passingThreshold={passingThreshold}
        setPassingThreshold={setPassingThreshold}
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        collapsedInstructors={collapsedInstructors}
        setCollapsedInstructors={setCollapsedInstructors}
        uniqueInstructors={uniqueInstructors}
      />

      <div className="text-muted mb-2">
        <small>
          Found {classResults.length} results from {uniqueInstructors.size} instructor(s)
        </small>
      </div>

      {groupingOption === "Default" && (
        <div className="resultList">
          {Object.entries(defaultGroupedClassResults).map(
            ([instructorName, { classes, uniqueCourses }]) => (
              <DefaultGrouping
                key={instructorName}
                instructorName={instructorName}
                instructorClasses={classes}
                uniqueCourses={uniqueCourses}
                passingThreshold={passingThreshold}
                isCollapsed={collapsedInstructors.has(instructorName)}
                onToggleCollapse={toggleInstructorCollapse}
              />
            )
          )}
        </div>
      )}

      {(groupingOption === "Semester" || groupingOption === "Course") && (
        <div className="resultList">
          {Object.entries(defaultGroupedClassResults).map(
            ([instructorName, { classes, uniqueCourses }]) => (
              <SubgroupedGrouping
                key={instructorName}
                instructorName={instructorName}
                instructorClasses={classes}
                uniqueCourses={uniqueCourses}
                passingThreshold={passingThreshold}
                subGroupType={groupingOption}
                isCollapsed={collapsedInstructors.has(instructorName)}
                onToggleCollapse={toggleInstructorCollapse}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
