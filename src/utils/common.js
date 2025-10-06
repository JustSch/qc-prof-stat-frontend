/**
 * Groups the results by instructor
 * @param {TClassResult[]} classResults - The array of result objects (grade data objects)
 * @returns {Record<string, {classes: TClassResult[], uniqueCourses: string[]}>} - The grouped results with unique courses
 */
export function groupClassResultsByInstructor(classResults) {
  const groupedClassResults = {};

  for (const gradeData of classResults) {
    if (!Object.prototype.hasOwnProperty.call(groupedClassResults, gradeData.instructor)) {
      groupedClassResults[gradeData.instructor] = {
        classes: [],
        uniqueCourses: [],
      };
    }

    // push the full grade data object directly
    groupedClassResults[gradeData.instructor].classes.push(gradeData);
  }

  // add unique courses for each instructor
  for (const classResults of Object.values(groupedClassResults)) {
    const coursesSet = new Set();

    for (const classItem of classResults.classes) {
      const course = `${classItem.subject} ${classItem.course_number}`;
      coursesSet.add(course);
    }

    // natsort so that lists like [CS 12, CS 120] get ordered correctly as [CS 12, CS 120]
    // instead of alphabetical sorting [CS 120, CS 12]
    classResults.uniqueCourses = [...coursesSet].toSorted((a, b) =>
      new Intl.Collator("en", { numeric: true }).compare(a, b)
    );
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
