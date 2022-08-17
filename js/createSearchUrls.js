export default function createSearchUrls (data,i) {
    let resURL = new URL(window.location.href+"classResult/");
          resURL.searchParams.append("instructor",data[i].instructor);
          resURL.searchParams.append("term",data[i].term);
          resURL.searchParams.append("subject",data[i].subject);
          resURL.searchParams.append("course_number",data[i].course_number);
          resURL.searchParams.append("class_section",data[i].class_section);

          let instrURL = new URL(window.location.href+"instructorResult/");
          instrURL.searchParams.append("instructor",data[i].instructor);

          return {resURL, instrURL};
}