import { Container, Row } from "react-bootstrap";

import Head from "next/head";
import { useRouter } from "next/router";

import {
  ClassResultChart,
  ClassResultHeader,
  ClassResultPlaceholder,
  ClassResultSummaryStats,
} from "@lib/components/class-result";
import { useNextFetch } from "@lib/hooks/useNextFetch";

export default function Page() {
  const router = useRouter();

  // router.query: query params from the router (instructor, term, subject, course_number, class_section)
  const classResultFetchState = useNextFetch(
    router.query,
    "/api/result/class/" + "?" + new URLSearchParams(router.query).toString()
  );

  // API endpoint returns an array of objects
  // Since we are querying for only one specific class, it should only return an array of size 1
  // We just return first object in the array
  const classResult = classResultFetchState.data?.[0];

  return (
    <>
      <Head>
        <title>Class Results - QC Prof Stat</title>
        <meta
          property="og:description"
          content="View detailed grade distribution analysis for this Queens College class"
        />
      </Head>

      {classResultFetchState.errorMessage && (
        <div className="bg-light min-vh-100">
          <Container className="py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="alert alert-danger border-0 shadow-sm text-center" role="alert">
                  <h4 className="alert-heading text-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Unable to Load Class Data
                  </h4>
                  <p className="mb-0">{classResultFetchState.errorMessage}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {classResultFetchState.isLoading && <ClassResultPlaceholder />}

      {classResult && (
        <div className="bg-light min-vh-100">
          <div className="bg-gradient bg-primary text-white py-4 mb-4">
            <Container>
              <ClassResultHeader gradeData={classResult} />
            </Container>
          </div>

          <Container className="py-4">
            <Row className="mb-4">
              <ClassResultSummaryStats gradeData={classResult} />
            </Row>
          </Container>

          <Container className="pb-4">
            <ClassResultChart gradeData={classResult} />
          </Container>
        </div>
      )}
    </>
  );
}
