/**
 * Groups the results by instructor
 * @param {TClassResult[]} classResults - The array of result objects (grade data objects)
 * @returns {Record<string, {classes: TClassResult[]}>} - The grouped results
 */
export function groupClassResultsByInstructor(classResults) {
  const groupedClassResults = {};

  for (const gradeData of classResults) {
    if (!Object.prototype.hasOwnProperty.call(groupedClassResults, gradeData.instructor)) {
      groupedClassResults[gradeData.instructor] = { classes: [] };
    }

    // push the full grade data object directly
    groupedClassResults[gradeData.instructor].classes.push(gradeData);
  }

  return groupedClassResults;
}

/**
 * @param {TClassResult[]} classSearchResults - array of class result objects
 * @returns {TClassResult[]} - sorted array of class result objects
 */
export function getSortedClassResults(classSearchResults) {
  return classSearchResults.toSorted((a, b) => {
    const termASortKeyString = getSortKeyString(a);
    const termBSortKeyString = getSortKeyString(b);

    return termBSortKeyString.localeCompare(termASortKeyString);
  });
}

/**
 * @param {TClassResult} classResult - class result object
 * @returns {string} - sort key string
 */
function getSortKeyString(classResult) {
  const [termName, termYear] = classResult.term.split(" ");

  /** @type {Record<string, number>} */
  const termNamePriorityMap = {
    Winter: 1,
    Spring: 2,
    Summer: 3,
    Fall: 4,
  };

  const termPriority = termNamePriorityMap[termName] ?? 0;

  return `${termYear} ${termPriority}${termName} ${classResult.subject} ${classResult.course_number} ${classResult.class_section}`;
}
