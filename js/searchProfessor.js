import sortStat from "./sortStat";
export default function searchProfessor() {
    const x = document
      .getElementById("search")
      .value;
    const url = "/instructor/" + x;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then((stat) =>{return sortStat(stat)})
      .then(function (data) {
        let out = "";
        let i;
        for (i = 0; i < data.length; i++) {
          let resURL = new URL(window.location.href+"classResult/");
          resURL.searchParams.append("instructor",data[i].instructor);
          resURL.searchParams.append("term",data[i].term);
          resURL.searchParams.append("subject",data[i].subject);
          resURL.searchParams.append("course_number",data[i].course_number);
          resURL.searchParams.append("class_section",data[i].class_section);

          let instrURL = new URL(window.location.href+"instructorResult/");
          instrURL.searchParams.append("instructor",data[i].instructor);
          
          out += `<p class='res'>  <a href="${instrURL.href}">${data[i].instructor}</a> |  <a href= "${resURL.href}" > 
                                          ${data[i].subject} ${data[i].course_number} | 
                                          Section  ${data[i].class_section} |  
                                          Term ${data[i].term} </a> </p>`;
        }
        document
          .getElementById("smth")
          .innerHTML = out;

      })
      .catch(function (err) {
        console.log(err);
      });
  }

