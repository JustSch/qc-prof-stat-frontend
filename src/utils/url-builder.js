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
  return "/api/instructor/" + encodeURIComponent(instructorName);
}

/**
 * Get class result arguments from query parameters
 * @param {Object} queryParams
 * @returns {Object} - Object containing class result arguments for API call
 */
export function getclassResultArguments(queryParams) {
  const classResultArguments = {
    instructor: queryParams.instructor,
    term: queryParams.term,
    subject: queryParams.subject,
    course_number: queryParams.course_number,
    class_section: queryParams.class_section,
  };

  if (Object.values(classResultArguments).includes(undefined)) {
    return {};
  }

  return classResultArguments;
}

/**
 * @param {Object} classResultArguments
 * @returns {string}
 */
export function buildClassResultApiUrl(classResultArguments) {
  // queryParams from the router may contain extra fields, so we only keep the relevant ones
  const reducedQueryParams = new URLSearchParams(classResultArguments);

  return "/api/result/class/?" + reducedQueryParams.toString();
}
