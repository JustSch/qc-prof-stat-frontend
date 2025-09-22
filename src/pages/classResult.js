import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

import { useRouter } from "next/router";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import useClassResult from "../hooks/useClassResult";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function ClassResult() {
  let router = useRouter();
  const [barData, setBarData] = useState(
    dataItem(
      ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "Pass", "C-", "D+", "D", "F"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    )
  );
  const [classDescr, setClassDescr] = useState("");
  const [doughnutData, setDoughnutData] = useState(
    dataItem(["Received Grade", "Withdrawals", "Incomplete"], [0, 0, 0])
  );
  const [doughnutGraphOptions, setDOptions] = useState(DoughnutOptions(""));
  let classParams = router.query;
  let instr = classParams["instructor"];

  const { data: gradeData, error, isLoading } = useClassResult(classParams);

  useEffect(() => {
    if (
      gradeData &&
      gradeData["message"] !== "Error retrieving [object Object]." &&
      gradeData["message"] !== " not found: [object Object]."
    ) {
      let specArray = [
        gradeData.A_plus,
        gradeData.A,
        gradeData.A_minus,
        gradeData.B_plus,
        gradeData.B,
        gradeData.B_minus,
        gradeData.C_plus,
        gradeData.C,
        gradeData.P,
        gradeData.C_minus,
        gradeData.D_plus,
        gradeData.D,
        gradeData.F,
      ];
      setBarData(
        dataItem(
          ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "Pass", "C-", "D+", "D", "F"],
          specArray
        )
      );
      setClassDescr(gradeData.course_desc);
      let totalGraded = gradeData.total_enrollment - gradeData.Withdrawal - gradeData.inc_ng;
      setDOptions(DoughnutOptions(`Total Enrollment: ${gradeData.total_enrollment} Students`));
      setDoughnutData(
        doughnutDataItem(
          ["Received Grade", "Withdrawals", "Incomplete"],
          [totalGraded, gradeData.Withdrawal, gradeData.inc_ng]
        )
      );
    }
  }, [gradeData]);

  return (
    <>
      <Container className="pb-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!error && (
          <div>
            <h4 className="text-center mb-4">
              {`${classParams["term"]}, `}
              {instr}. ,
              {` ${classParams["subject"]} ${classParams["course_number"]}-${classParams["class_section"]} ${classDescr}`}
            </h4>
            <Row className="align-items-center">
              {!isLoading && (
                <>
                  <Col>
                    <Bar data={barData} options={barGraphOptions} height={300} />
                  </Col>
                  <Col>
                    <Doughnut data={doughnutData} options={doughnutGraphOptions} />
                  </Col>
                </>
              )}

              {isLoading && (
                <div className="placeholder-glow">
                  <span className="d-block placeholder my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-75 my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-50 my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-25 my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-75 my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-50 my-3" style={{ height: 35 }}></span>
                  <span className="d-block placeholder w-25 my-3" style={{ height: 35 }}></span>
                </div>
              )}
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}

function dataItem(label, resultItem) {
  return {
    labels: label,
    datasets: [
      {
        label: "# of Individual Grades",
        data: resultItem,
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
          "rgba(22, 216, 237, 0.2)",
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
          "rgba(22, 216, 237, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
}

const barGraphOptions = {
  elements: {
    line: {
      tension: 0.2,
    },
  },
  plugins: {
    legend: {
      onClick: null,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 10,
      ticks: {
        precision: 0, // prevents y-axis from representing decimal point numbers
      },
    },
  },
};

function doughnutDataItem(label, resultItem) {
  return {
    labels: label,
    datasets: [
      {
        label: "# of Individual Grades",
        data: resultItem,
        backgroundColor: ["rgba(0,250,41,0.2)", "rgba(250,0,3,0.2)", "rgba(216,178,27,0.2)"],
        borderColor: ["rgba(0,250,41,1)", "rgba(250,0,3,1)", "rgba(216,178,27,1)"],
        borderWidth: 2,
      },
    ],
  };
}

export function DoughnutOptions(title) {
  return {
    plugins: {
      legend: {
        onClick: null,
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]}: ${data} Students`,
              fillStyle: datasets[0].backgroundColor[i],
            }));
          },
        },
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
}
