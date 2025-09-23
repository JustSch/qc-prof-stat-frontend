/**
 * Groups the results by instructor
 * @param {Array} classResults - The array of result objects
 * @returns {Object} - The grouped results
 */
export function groupClassResultsByInstructor(classResults) {
  const groupedClassResults = {};

  for (const result of classResults) {
    if (!Object.prototype.hasOwnProperty.call(groupedClassResults, result.instructor)) {
      groupedClassResults[result.instructor] = { classes: [] };
    }

    groupedClassResults[result.instructor].classes.push({
      subject: result.subject,
      course_number: result.course_number,
      class_section: result.class_section,
      term: result.term,
    });
  }

  return groupedClassResults;
}

/**
 * @param {Object} data - Truncated class result object: {subject: string; course_number: string; class_section: string; term: string;}
 * @param {string} instructor - The instructor's name
 * @returns {URL} - The section URL
 */
export function getSectionUrl(data, instructor) {
  const resURL = new URL(window.location.origin + "/class-result/");

  resURL.searchParams.append("instructor", instructor);
  resURL.searchParams.append("term", data.term);
  resURL.searchParams.append("subject", data.subject);
  resURL.searchParams.append("course_number", data.course_number);
  resURL.searchParams.append("class_section", data.class_section);

  return resURL;
}

// export function getInstructorURL(data) {
//   const instrURL = new URL(window.location.origin + "/instructorResult/");
//   instrURL.searchParams.append("instructor", data);

//   return instrURL;
// }

// export function createSearchUrls(data) {
//   const resURL = new URL(window.location.href + "class-result/");

//   resURL.searchParams.append("instructor", data.instructor);
//   resURL.searchParams.append("term", data.term);
//   resURL.searchParams.append("subject", data.subject);
//   resURL.searchParams.append("course_number", data.course_number);
//   resURL.searchParams.append("class_section", data.class_section);

//   const instrURL = new URL(window.location.href + "instructorResult/");
//   instrURL.searchParams.append("instructor", data.instructor);

//   return { resURL, instrURL };
// }

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
