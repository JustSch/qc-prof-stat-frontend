window.onload = function () {
  init();
};

function init() {
  let instructorParams = new URL(window.location).searchParams;
  let url = "/result/" + instructorParams.get('instructor');

  fetch(url).then(function (response) {
    return response.json();
  }).then((stat) => {return sortStat(stat)})
  .then(function (data) {
    appendDataToNavBar(data);
    var soredtedData = sortingData(data);
    creatingChartsAndTables(soredtedData);
  }).catch(function (err) {
    console.log(err);
  });
}

function sortingData(data) {
  var map = new Map();
  data.forEach(element => {
    let str = `${element.subject} ${element.course_number}`;
    if (map.size === 0 || map.get(str) === undefined) {
      map.set(str, [element]);
    } else {
      map.get(str).push(element);
    }
  });
  return map;
}

function creatingChartsAndTables(data) {
  let chartArea = document.getElementById("chart-area");
  data.forEach((value, key) => {
    let bar = makeClassBar(key,value[0].course_desc);
    chartArea.appendChild(bar);

    let charts = makeClassChartHTML(key, value);
    chartArea.appendChild(charts);

    let currentChart = document.getElementById(`${key.replace(" ","")}Chart`);
    let chart = makeChart(currentChart);
    let table = makeTable(key.replace(" ",""));
    chartArea.appendChild(table);

    let selector = document.getElementById(`${key.replace(" ","")}-selector`);
    selector.addEventListener('change',(event) => {
      setChartAndTable(key.replace(" ",""),value,chart);
    });
    
  
    
  });
}

function makeClassBar(name,desc) {
  let nav = document.createElement("nav");
  nav.setAttribute("class", "navbar navbar-light bg-light");
  nav.setAttribute("aria-label", `course-bar${name.replace(" ", "")}`);
  let p = document.createElement("p");
  p.setAttribute("class", "navbar-brand");
  let text = document.createTextNode(`${name}, ${desc}`);
  p.appendChild(text);
  nav.appendChild(p);
  return nav;
}

function makeChart(chart) {
  var dummyData = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var ctx = chart.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "Pass",
        "C-",
        "D",
        "F"
      ],
      datasets: [
        {
          label: "# of Individual Grades",
          data: dummyData,
          backgroundColor: [
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)",
            "rgba(22, 216, 237, 0.2)"
          ],
          borderColor: [
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)",
            "rgba(22, 216, 237, 1)"
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      elements: {
        line: {
          tension: 0.2
        }
      },
      legend: {
        onClick: null
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: "rgb(153, 153, 153, .1)"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: "rgb(153, 153, 153, .1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  return myChart;
}
function makeClassChartHTML(name, data) {
  let rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "row");

  let colDiv0 = document.createElement("div");
  colDiv0.setAttribute("class", "col");

  let select = document.createElement("select");
  select.setAttribute("id", `${name.replace(" ","")}-selector`);

  let option = document.createElement("option");
  option.setAttribute("value", "default");
  let text = document.createTextNode("Select a Class");
  option.appendChild(text);

  select.appendChild(option);

  for (let i = 0; i < data.length; i++) {
    let option0 = document.createElement("option");
    option0.setAttribute("value", i);
    text = document.createTextNode(`${data[i].term}  | ${data[i].subject}  | ${data[i].course_number}  |  ${data[i].class_section}`);
    option0.appendChild(text);
    select.appendChild(option0);
  }

  colDiv0.appendChild(select);
  rowDiv.appendChild(colDiv0);

  let col1 = document.createElement("div");
  col1.setAttribute("class", "col");

  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", `${name.replace(" ","")}Chart`);
  canvas.setAttribute("width", "400");
  canvas.setAttribute("height", "400");

  col1.appendChild(canvas);
  rowDiv.appendChild(col1);

  let col2 = document.createElement("div");
  col2.setAttribute("class", "col");

  rowDiv.appendChild(col2);

  return rowDiv;
}

function makeTable(name) {
  let row = document.createElement("div");
  row.setAttribute("class","row");

  let col = document.createElement("div");
  col.setAttribute("class","col");

  let dr = document.createElement("div");
  dr.setAttribute("class","table-responsive");

  let table = document.createElement("table");
  table.setAttribute("class","table");

  let thead = document.createElement("thead");
  thead.setAttribute("id","target");

  let tr = document.createElement("tr");

  let th = document.createElement("th");
  th.setAttribute("scope","col");

  let txt = document.createTextNode("Incomplete");

  th.appendChild(txt);
  tr.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("scope","col");
  txt = document.createTextNode("Total Enrollment");
  th.appendChild(txt);
  tr.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("scope","col");
  txt = document.createTextNode("Withdrawals (WD)");
  th.appendChild(txt);
  tr.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("scope","col");
  txt = document.createTextNode("TE - WD");
  th.appendChild(txt);
  tr.appendChild(th);

  thead.appendChild(tr);
  table.appendChild(thead);
  let body = document.createElement("tbody");
  body.setAttribute("id",`${name}-data-container`);
  table.appendChild(body);

  dr.appendChild(table);
  col.appendChild(dr);
  row.appendChild(col);

  return row;

}

function setChartAndTable(name,data,chart) {
  appendDataToTable(name,data);
  fillChart(chart,data,name);
}

function appendDataToNavBar(data) {
  document.getElementById("nvbr").innerText = `${data[0].instructor}.`;
  document.getElementById("title").innerText = data[0].instructor + " | QC Prof Stat";
}

function appendDataToTable(name,data) {
  let i = document.querySelector(`#${name}-selector`).value;
  if (i != "default"){
    document.getElementById(`${name}-data-container`).innerHTML = "<tr>" + "<td>" + data[i].inc_ng + "</td>" + "<td>" + data[i].total_enrollment + "</td>" + "<td>" + data[i].Withdrawal + "</td>" + "<td>" + (
      data[i].total_enrollment - parseInt(data[i].Withdrawal)) + "</td>" + "</tr>";
    
  }
  
}

//this allows us to update the chart

function addData(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

function removeData(chart) {
  //probably not working
  chart.data.datasets[0].data.pop();
  chart.update();
}

//this allows us to update the chart whenever we click on the select drop-down

function fillChart(myChart, data, name) {
  let indexValue = document.querySelector(`#${name}-selector`).value;
  var specArray = [
    data[indexValue].A_plus,
    data[indexValue].A,
    data[indexValue].A_minus,
    data[indexValue].B_plus,
    data[indexValue].B,
    data[indexValue].B_minus,
    data[indexValue].C_plus,
    data[indexValue].C,
    data[indexValue].P,
    data[indexValue].C_minus,
    data[indexValue].D,
    data[indexValue].F
  ];
  addData(myChart, specArray);
}

function sortStat(stat){
  stat.sort((a,b) => {
    var term0 = a.term.split(' ');
    var term1 = b.term.split(' ');

    if (term0[1] === term1[1]){
      if (term0[0] === 'Fall'){
        if (term0[0] === term1[0]) {
          return 0;
        }
        else {
          return -1;
        }
      }
      if (term0[0] === 'Spring'){
        if (term0[0] === term1[0]) {
          return 0;
        }
        else {
          return 1;
        }
      }
    }
    return term1[1] - term0[1];
  });
  return stat;
}