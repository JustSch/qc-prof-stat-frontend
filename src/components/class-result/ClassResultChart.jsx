import { Card, Col, Row } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

import {
  BAR_GRAPH_OPTIONS,
  GRADE_VALUES_TO_LABELS_MAP,
  SUMMARY_LABELS,
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
 * @param {Object} props.gradeData - Grade data object containing enrollment and grade counts
 * @returns {JSX.Element}
 */
export function ClassResultChart({ gradeData }) {
  const gradeLabels = Object.values(GRADE_VALUES_TO_LABELS_MAP);
  const gradeCounts = Object.keys(GRADE_VALUES_TO_LABELS_MAP).map((key) => gradeData[key] ?? "0");

  const barData = createBarChartData(gradeLabels, gradeCounts);
  const totalGradedStudents = gradeData.total_enrollment - gradeData.Withdrawal - gradeData.inc_ng;

  const doughnutData = createDoughnutChartData(SUMMARY_LABELS, [
    totalGradedStudents,
    gradeData.Withdrawal,
    gradeData.inc_ng,
  ]);

  const doughnutOptions = createDoughnutOptions(
    `Total Enrollment: ${gradeData.total_enrollment} Students`
  );

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
