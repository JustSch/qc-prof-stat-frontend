import { Col, Container, Row } from "react-bootstrap";

/**
 * Placeholder component that displays animated loading placeholders for charts
 * while grade data is being fetched
 * @returns {JSX.Element}
 */
export function ClassResultPlaceholder() {
  return (
    <Container className="p-4">
      {/* Header placeholder */}
      <div className="text-center mb-4">
        <div className="placeholder-glow">
          <div
            className="placeholder bg-secondary rounded mx-auto mb-2"
            style={{ width: "60%", height: "28px" }}
          ></div>
          <div
            className="placeholder bg-secondary rounded mx-auto"
            style={{ width: "45%", height: "24px" }}
          ></div>
        </div>
      </div>

      {/* Charts placeholder */}
      <Row className="align-items-center">
        {/* Bar chart placeholder */}
        <Col xs={12} lg={6} className="mb-4 mb-lg-0">
          <div className="card border-0">
            <div className="card-body">
              <div className="placeholder-glow">
                {/* Simulated bar chart */}
                <div
                  className="d-flex align-items-end justify-content-around"
                  style={{ height: "200px" }}
                >
                  {[0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.9, 0.2, 0.1, 0.3, 0.2, 0.1, 0.4].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="placeholder bg-info rounded-top"
                        style={{
                          width: "6%",
                          height: `${height * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    )
                  )}
                </div>

                {/* X-axis labels */}
                <div className="d-flex justify-content-around mt-2">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <div
                      key={i}
                      className="placeholder bg-secondary rounded"
                      style={{ width: "6%", height: "12px" }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Doughnut chart placeholder */}
        <Col xs={12} lg={6}>
          <div className="card border-0">
            <div className="card-body text-center">
              <div className="placeholder-glow">
                {/* Simulated doughnut chart */}
                <div className="mx-auto mb-3 position-relative d-inline-block">
                  <div
                    className="placeholder bg-success rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  ></div>
                  <div
                    className="bg-white rounded-circle position-absolute top-50 start-50 translate-middle"
                    style={{ width: "75px", height: "75px" }}
                  ></div>
                </div>

                {/* Legend */}
                <div className="d-flex flex-column align-items-center gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="d-flex align-items-center gap-2">
                      <div
                        className="placeholder rounded"
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: ["#00fa29", "#fa0003", "#d8b21b"][i],
                        }}
                      ></div>
                      <div
                        className="placeholder bg-secondary rounded"
                        style={{ width: "120px", height: "16px" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
