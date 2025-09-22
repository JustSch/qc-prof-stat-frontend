export default function groupResult(results) {
  if (typeof Object.hasOwn !== "function") {
    Object.hasOwn = function (obj, characteristic) {
      return obj.hasOwnProperty(characteristic);
    };
  }

  let res = {};
  for (let result of results) {
    if (Object.hasOwn(res, result.instructor)) {
      res[result.instructor].classes.push({
        subject: result.subject,
        course_number: result.course_number,
        class_section: result.class_section,
        term: result.term,
      });
    } else {
      res[result.instructor] = {
        classes: [
          {
            subject: result.subject,
            course_number: result.course_number,
            class_section: result.class_section,
            term: result.term,
          },
        ],
      };
    }
  }

  return res;
}
