/**
 * Groups the results by instructor
 * @param {TClassResult[]} classResults - The array of result objects (grade data objects)
 * @returns {Record<string, TClassResult[]>} - The grouped results
 */
export function groupClassResultsByInstructor(classResults) {
  const groupedClassResults = /** @type {Record<string, TClassResult[] >} */ ({});

  for (const gradeData of classResults) {
    if (!Object.prototype.hasOwnProperty.call(groupedClassResults, gradeData.instructor)) {
      groupedClassResults[gradeData.instructor] = [];
    }

    // push the full grade data object directly instead of creating a custom object
    groupedClassResults[gradeData.instructor].push(gradeData);
  }

  return groupedClassResults;
}

/**
 * @param {TClassResult} classResult - Class grade data from API
 * @returns {URL} - The section URL
 */
export function getSectionUrl(classResult) {
  const sectionUrl = new URL(window.location.origin + "/class-result/");

  sectionUrl.searchParams.append("instructor", classResult.instructor);
  sectionUrl.searchParams.append("term", classResult.term);
  sectionUrl.searchParams.append("subject", classResult.subject);
  sectionUrl.searchParams.append("course_number", classResult.course_number);
  sectionUrl.searchParams.append("class_section", classResult.class_section);

  return sectionUrl;
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
