export default function createResURL(data,instructor) {
    let resURL = new URL(window.location.origin + "/classResult/");
    resURL.searchParams.append("instructor", instructor);
    resURL.searchParams.append("term", data.term);
    resURL.searchParams.append("subject", data.subject);
    resURL.searchParams.append("course_number", data.course_number);
    resURL.searchParams.append("class_section", data.class_section);
    return resURL;
}