import { useEffect, useRef, useState } from "react";

import { Button, Container, Dropdown, Form, InputGroup, Spinner } from "react-bootstrap";

import Head from "next/head";
import { useRouter } from "next/router";

import { faGraduationCap, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SearchResults } from "@lib/components/SearchResults";
import { useNextFetch } from "@lib/hooks/useNextFetch";
import { GRADE_VALUES_TO_LABELS_MAP } from "@lib/utils/class-result";
import { buildInstructorApiUrl } from "@lib/utils/url-builder";

export default function Page() {
  const router = useRouter();

  const classSearchFetchState = useNextFetch(router.query, buildInstructorApiUrl(router.query.q));
  const searchInputRef = useRef(null);

  const passingGradeThresholds = ["C", "C_minus", "D"];
  const [passingThreshold, setPassingThreshold] = useState("C");

  useEffect(() => {
    if (searchInputRef.current.value === "" && router.query.q) {
      searchInputRef.current.value = router.query.q;
    }
  }, [router.query.q]);

  // reset search results when navigating to home page back from a query
  useEffect(() => {
    if (!router.query.q && (classSearchFetchState.data || classSearchFetchState.errorMessage)) {
      classSearchFetchState.reset();
      searchInputRef.current.value = "";
    }
  }, [router.query.q, classSearchFetchState]);

  /**
   * Handle search form submission and update the URL query parameter.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event (will call preventDefault())
   * @returns {void}
   */
  function handleSearchSubmission(event) {
    event.preventDefault();

    const searchValue = searchInputRef.current.value.trim();
    if (searchValue === "") return;

    if (searchValue === router.query.q) return;

    const params = new URLSearchParams({ q: searchValue });
    const href = `/?${params.toString()}`;

    router.push(href, undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>Find Grade Distributions - QC Prof Stat</title>
        <meta property="og:title" content="QC Prof Stat - Find Grade Distributions" />
        <meta
          property="og:description"
          content="Search Queens College professors and discover grade distributions for their courses"
        />
        <meta property="og:url" content="https://qc-prof-stat.web.app" />
      </Head>

      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">
              <FontAwesomeIcon icon={faGraduationCap} className="me-3" />
              <span className="text-warning">QC</span> Prof Stat
            </h1>
            <p className="lead mb-4">
              Discover grade distributions for{" "}
              <span className="text-warning fw-bold">Queens College</span> courses
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* search */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="text-center mb-4">
              <h2 className="h4 text-muted mb-3">Find Your Professor</h2>
              <p className="text-muted">
                Search by <strong>Last Name</strong> or <strong>Last Name, First Initial</strong>
              </p>
            </div>

            <form onSubmit={handleSearchSubmission}>
              <InputGroup className="mb-4 shadow-sm">
                <Form.Control
                  id="search"
                  placeholder="Enter professor's name..."
                  aria-label="search"
                  aria-describedby="search-addon1"
                  ref={searchInputRef}
                  size="lg"
                  className="border-end-0"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  id="button-addon1"
                  size="lg"
                  disabled={classSearchFetchState.isLoading}
                  className="px-4"
                >
                  {!classSearchFetchState.isLoading && <FontAwesomeIcon icon={faMagnifyingGlass} />}
                  {classSearchFetchState.isLoading && (
                    <Spinner variant="light" animation="border" role="status" size={"sm"}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                </Button>
              </InputGroup>
            </form>

            {/* select passing grade threshold */}
            {router.query.q && classSearchFetchState.data && (
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center gap-3">
                  <span className="text-muted">Minimum Passing Grade:</span>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" size="sm" id="threshold-dropdown">
                      {GRADE_VALUES_TO_LABELS_MAP[passingThreshold]} or Higher
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {passingGradeThresholds.map((gradeKey) => (
                        <Dropdown.Item
                          key={gradeKey}
                          active={passingThreshold === gradeKey}
                          onClick={() => setPassingThreshold(gradeKey)}
                        >
                          {GRADE_VALUES_TO_LABELS_MAP[gradeKey]} or Higher
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* search results */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div id="searchbox">
              {classSearchFetchState.errorMessage && (
                <div className="alert alert-danger shadow-sm" role="alert">
                  <strong>Oops!</strong> {classSearchFetchState.errorMessage}
                </div>
              )}
              {classSearchFetchState.data && (
                <SearchResults
                  classResults={classSearchFetchState.data}
                  passingThreshold={passingThreshold}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
