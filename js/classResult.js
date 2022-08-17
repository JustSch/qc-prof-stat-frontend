window.onload = function () {
  buildGraph();
};

function buildGraph() {
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
  var ctx = document.getElementById("myChart").getContext("2d");
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

  let url = "/result/class" + window.location.search;

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    appendDataToNavBar(data);  
    appendDataToTable(data); //this is for appending data to the table and other parts of the page
    fillChart(myChart,data);
  }).catch(function (err) {
    console.log(err);
  });
}

function appendDataToNavBar(data){
  let instrURL = new URL(window.location.origin+"/instructorResult/");
  instrURL.searchParams.append("instructor",data[0].instructor);
    document.getElementById("nvbr").innerHTML = `${data[0].term}, <a href="${instrURL.href}">${data[0].instructor}</a> ., ${data[0].subject},  ${data[0].course_number}-${data[0].class_section}
                          ${data[0].course_desc}`;
  document.getElementById("title").innerText = data[0].instructor + " | QC Prof Stat";
}

function appendDataToTable(data) {  
  for (var i = 0; i < data.length; i++) {
    document.getElementById("data-container").innerHTML += "<tr>" + "<td>" + data[i].inc_ng + "</td>" + "<td>" + data[i].total_enrollment + "</td>" + "<td>" + data[i].Withdrawal + "</td>" + "<td>" + (
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

function fillChart(myChart,data) {
  var indexValue = 0;
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
