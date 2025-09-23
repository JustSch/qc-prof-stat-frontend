import { Col } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const GRADE_POINTS = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "Pass", "C-", "D+", "D", "F"];
const NO_GRADE_POINTS = ["Received Grade", "Withdrawals", "Incomplete"];

/**
 * Component to render bar and doughnut charts for class grade results
 * @param {Object} props
 * @param {Object} props.gradeData - Grade data object containing enrollment and grade counts
 * @returns {JSX.Element}
 */
export function ClassResultChart({ gradeData }) {
  if (!gradeData) return null;

  const gradeCounts = [
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

  const barData = createBarChartData(GRADE_POINTS, gradeCounts);

  const totalGradedStudents = gradeData.total_enrollment - gradeData.Withdrawal - gradeData.inc_ng;

  const doughnutData = createDoughnutChartData(NO_GRADE_POINTS, [
    totalGradedStudents,
    gradeData.Withdrawal,
    gradeData.inc_ng,
  ]);

  const doughnutOptions = createDoughnutOptions(
    `Total Enrollment: ${gradeData.total_enrollment} Students`
  );

  return (
    <>
      <Col>
        <Bar data={barData} options={barGraphOptions} height={300} />
      </Col>
      <Col>
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </Col>
    </>
  );
}

/**
 * Build a Chart.js bar chart data object for grade distribution.
 * @param {string[]} labels - Labels for the x-axis (grade categories)
 * @param {number[]} dataValues - Numeric values corresponding to each label
 * @returns {Object} - Chart.js bar data object
 */
function createBarChartData(labels, dataValues) {
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Individual Grades",
        data: dataValues,
        backgroundColor: Array.from({ length: dataValues.length }).fill("rgba(22, 216, 237, 0.2)"),
        borderColor: Array.from({ length: dataValues.length }).fill("rgba(22, 216, 237, 1)"),
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

/**
 * Build a Chart.js doughnut chart data object for summary categories.
 * @param {string[]} labels - Labels for the doughnut slices
 * @param {number[]} dataValues - Numeric values for each slice
 * @returns {Object} - Chart.js doughnut data object
 */
function createDoughnutChartData(labels, dataValues) {
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Individual Grades",
        data: dataValues,
        backgroundColor: ["rgba(0,250,41,0.2)", "rgba(250,0,3,0.2)", "rgba(216,178,27,0.2)"],
        borderColor: ["rgba(0,250,41,1)", "rgba(250,0,3,1)", "rgba(216,178,27,1)"],
        borderWidth: 2,
      },
    ],
  };
}

/**
 * Generate options object for the Doughnut chart.
 * @param {string} title - The title text to display above the chart
 * @returns {Object} - Chart.js doughnut options object
 */
function createDoughnutOptions(title) {
  return {
    plugins: {
      legend: {
        onClick: undefined,
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
