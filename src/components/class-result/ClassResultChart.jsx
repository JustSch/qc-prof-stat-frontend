import { Card, Col, Row } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

import {
  BAR_GRAPH_OPTIONS,
  createBarChartData,
  createDoughnutChartData,
  createDoughnutOptions,
} from "@lib/utils/class-result";

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

/**
 * Component to render bar and doughnut charts for class grade results
 * @param {Object} props
 * @param {TClassResult} props.classResult - Grade data object containing enrollment and grade counts
 * @param {TSummaryStats} props.summaryStats - Computed summary statistics
 */
export function ClassResultChart({ classResult, summaryStats }) {
  const doughnutSummaryPoints = [
    {
      label: "Passing Letter Grades",
      backgroundColor: "rgba(0,250,41,0.2)",
      borderColor: "rgba(0, 250, 42, 0.4)",
      value: summaryStats.totalPassingGrades,
    },
    {
      label: "Unsatisfactory Letter Grades",
      backgroundColor: "rgba(250,0,3,0.2)",
      borderColor: "rgba(250, 0, 4, 0.34)",
      // subtract passing grades, withdrawals, and incompletes from total enrollment
      value:
        classResult.total_enrollment -
        summaryStats.totalPassingGrades -
        Number.parseInt(classResult.Withdrawal) -
        classResult.inc_ng,
    },
    {
      label: "Withdrawals",
      backgroundColor: "rgba(216,178,27,0.2)",
      borderColor: "rgba(216, 178, 27, 0.49)",
      value: Number.parseInt(classResult.Withdrawal),
    },
    {
      label: "Incomplete",
      backgroundColor: "rgba(126,126,126,0.2)",
      borderColor: "rgba(126, 126, 126, 0.42)",
      value: classResult.inc_ng,
    },
  ];

  const barData = createBarChartData(summaryStats.gradeLabels, summaryStats.gradeCounts);
  const doughnutOptions = createDoughnutOptions(
    `Total Enrollment: ${classResult.total_enrollment} Students`
  );

  const doughnutData = createDoughnutChartData(doughnutSummaryPoints);

  return (
    <Card className="border-0 shadow-sm py-4">
      <Card.Header className="bg-white border-0 py-3">
        <h4 className="mb-0 text-center">
          <i className="bi bi-bar-chart-fill text-primary me-2"></i>
          Grade Distribution Analysis
        </h4>
      </Card.Header>
      <Card.Body className="p-2">
        <Row className="align-items-center g-4">
          <Col xs={12} lg={8} xl={7}>
            <Bar data={barData} options={BAR_GRAPH_OPTIONS} height={400} />
          </Col>
          <Col xs={12} lg={4} xl={5} className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "400px",
              }}
            >
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
