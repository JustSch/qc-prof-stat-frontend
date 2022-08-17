import createSearchUrls from "./createSearchUrls";
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
          let {resURL, instrURL} = createSearchUrls(data,i);
          
          out += `<p class='res'>  <a href="${instrURL.href}">${data[i].instructor}</a> |  <a href= "${resURL.href}" > 
                                          ${data[i].subject} ${data[i].course_number} | 
                                          Section  ${data[i].class_section} |  
                                          Term ${data[i].term} </a> </p>`;
        }
        document
          .getElementById("searchbox")
          .innerHTML = out;

      })
      .catch(function (err) {
        console.log(err);
      });
  }

