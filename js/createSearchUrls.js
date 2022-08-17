export default function createSearchUrls (data) {
    let resURL = new URL(window.location.href+"classResult/");
          resURL.searchParams.append("instructor",data.instructor);
          resURL.searchParams.append("term",data.term);
          resURL.searchParams.append("subject",data.subject);
          resURL.searchParams.append("course_number",data.course_number);
          resURL.searchParams.append("class_section",data.class_section);

          let instrURL = new URL(window.location.href+"instructorResult/");
          instrURL.searchParams.append("instructor",data.instructor);

          return {resURL, instrURL};
}