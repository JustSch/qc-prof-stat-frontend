/**
 * Groups the results by instructor
 * @param {Array} classResults - The array of result objects (grade data objects)
 * @returns {Object} - The grouped results
 */
export function groupClassResultsByInstructor(classResults) {
  const groupedClassResults = {};

  for (const gradeData of classResults) {
    if (!Object.prototype.hasOwnProperty.call(groupedClassResults, gradeData.instructor)) {
      groupedClassResults[gradeData.instructor] = { classes: [] };
    }

    // push the full grade data object directly instead of creating a custom object
    groupedClassResults[gradeData.instructor].classes.push(gradeData);
  }

  return groupedClassResults;
}

/**
 * @param {Object} gradeData - Class grade data from API
 * @returns {URL} - The section URL
 */
export function getSectionUrl(gradeData) {
  const sectionUrl = new URL(window.location.origin + "/class-result/");

  sectionUrl.searchParams.append("instructor", gradeData.instructor);
  sectionUrl.searchParams.append("term", gradeData.term);
  sectionUrl.searchParams.append("subject", gradeData.subject);
  sectionUrl.searchParams.append("course_number", gradeData.course_number);
  sectionUrl.searchParams.append("class_section", gradeData.class_section);

  return sectionUrl;
}

/**
 * @param {Array<Object>} classSearchResults - array of class result objects
 * @returns {Array<Object>} - sorted array of class result objects
 */
export function getSortedClassResults(classSearchResults) {
  return classSearchResults.toSorted((a, b) => {
    const termASortKeyString = getSortKeyString(a);
    const termBSortKeyString = getSortKeyString(b);

    return termBSortKeyString.localeCompare(termASortKeyString);
  });
}

/**
 * @param {Object} courseSection - class result object
 * @returns {string} - sort key string
 */
function getSortKeyString(courseSection) {
  const [termName, termYear] = courseSection.term.split(" ");
  const termNamePriorityMap = {
    Winter: 1,
    Spring: 2,
    Summer: 3,
    Fall: 4,
  };

  const termPriority = termNamePriorityMap[termName] ?? 0;

  return `${termYear} ${termPriority}${termName} ${courseSection.subject} ${courseSection.course_number} ${courseSection.class_section}`;
}
