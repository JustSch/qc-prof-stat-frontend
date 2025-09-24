import { Card } from "react-bootstrap";

import {
  faArrowRightFromBracket,
  faBookOpen,
  faPause,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GRADE_VALUES_TO_LABELS_MAP } from "@lib/utils/class-result";

/**
 * Component that displays summary statistics cards for class result
 * @param {Object} props
 * @param {Object} props.gradeData - Grade data object containing enrollment and grade counts
 * @returns {JSX.Element}
 */
export function ClassResultSummaryStats({ gradeData }) {
  const gradeCounts = Object.keys(GRADE_VALUES_TO_LABELS_MAP).map((key) => gradeData[key] ?? "0");

  // map gradeCounts to binary representation of pass or not pass, eg: [1, 1, 1, 1, 0, 0, 0]
  const completedIndicators = Object.keys(GRADE_VALUES_TO_LABELS_MAP).map((gradeKey) => {
    if (
      gradeKey.startsWith("A") ||
      gradeKey.startsWith("B") ||
      (gradeKey.startsWith("C") && gradeKey !== "C_minus")
      // || gradeKey === "P"
    ) {
      return 1;
    }
    return 0;
  });

  // sum up the actual numeric values for passing grades
  let passingGradeCount = 0;
  for (const [i, completedIndicator] of completedIndicators.entries()) {
    if (completedIndicator === 0) continue;

    passingGradeCount += Number.parseInt(gradeCounts[i]);
  }

  return (
    <>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faUsers} className="text-primary fs-1 mb-2" />
            <h5 className="card-title">Total Enrollment</h5>
            <h3 className="text-primary mb-0">{gradeData.total_enrollment}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faBookOpen} className="text-success fs-1 mb-2" />
            <h5 className="card-title">Completed Course</h5>
            <h3 className="text-success mb-0">{passingGradeCount}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-warning fs-1 mb-2" />
            <h5 className="card-title">Withdrawals</h5>
            <h3 className="text-warning mb-0">{gradeData.Withdrawal}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faPause} className="text-info fs-1 mb-2" />
            {/* <FontAwesomeIcon icon={faQuestionCircle} className="text-info fs-1 mb-2" /> */}
            <h5 className="card-title">Incomplete</h5>
            <h3 className="text-info mb-0">{gradeData.inc_ng}</h3>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
