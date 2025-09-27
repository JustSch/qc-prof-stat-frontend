import { Card } from "react-bootstrap";

import {
  faArrowRightFromBracket,
  faBookOpen,
  faPause,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Component that displays summary statistics cards for class result
 * @param {Object} props
 * @param {TClassResult} props.classResult - Grade data object containing enrollment and grade counts
 * @param {TSummaryStats} props.summaryStats - Computed summary statistics
 */
export function ClassResultSummaryStats({ classResult: classResult, summaryStats }) {
  return (
    <>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faUsers} className="text-primary fs-1 mb-2" />
            <h5 className="card-title">Total Enrollment</h5>
            <h3 className="text-primary mb-0">{classResult.total_enrollment}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faBookOpen} className="text-success fs-1 mb-2" />
            <h5 className="card-title">Completed Course</h5>
            <h3 className="text-success mb-0">{summaryStats.totalPassingGrades}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-warning fs-1 mb-2" />
            <h5 className="card-title">Withdrawals</h5>
            <h3 className="text-warning mb-0">{classResult.Withdrawal}</h3>
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-3 col-md-6 mb-3">
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="text-center">
            <FontAwesomeIcon icon={faPause} className="text-info fs-1 mb-2" />
            {/* <FontAwesomeIcon icon={faQuestionCircle} className="text-info fs-1 mb-2" /> */}
            <h5 className="card-title">Incomplete</h5>
            <h3 className="text-info mb-0">{classResult.inc_ng}</h3>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
