/**
 * @param {TClassResult} classResult
 * @returns {string}
 */
export function buildClassResultPageUrl(classResult) {
  const queryParams = new URLSearchParams({
    instructor: classResult.instructor,
    term: classResult.term,
    subject: classResult.subject,
    course_number: classResult.course_number,
    class_section: classResult.class_section,
  });

  return "/class-result/?" + queryParams.toString();
}

/**
 * @param {string} instructorName
 * @returns {string}
 */
export function buildInstructorApiUrl(instructorName) {
  return "/api/instructor/" + instructorName;
}

/**
 * @param {Object} queryParams
 * @returns {string}
 */
export function buildClassResultApiUrl(queryParams) {
  // queryParams from the router may contain extra fields, so we only keep the relevant ones
  const reducedQueryParams = new URLSearchParams({
    instructor: queryParams.instructor,
    term: queryParams.term,
    subject: queryParams.subject,
    course_number: queryParams.course_number,
    class_section: queryParams.class_section,
  });

  return "/api/result/class/?" + reducedQueryParams.toString();
}
