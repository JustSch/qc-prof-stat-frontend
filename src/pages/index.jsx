import { useEffect, useRef, useState } from "react";

import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";

import Head from "next/head";
import { useRouter } from "next/router";

import { faGraduationCap, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SearchResults } from "@lib/components/SearchResults";
import { useSearchResult } from "@lib/hooks/useSearchResult";

export default function Page() {
  const router = useRouter();

  const classSearchFetchState = useSearchResult(router.query.q);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchRef.current.value === "" && router.query.q) {
      searchRef.current.value = router.query.q;
      setSearchValue(router.query.q);
    }
  }, [router.query.q]);

  return (
    <>
      <Head>
        <meta property="og:title" content="QC Prof Stat" />
        <meta property="og:description" content="Allows Students to see grading distributions" />
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

            <form onSubmit={(event) => changeQuery(event, searchValue, router)}>
              <InputGroup className="mb-4 shadow-sm">
                <Form.Control
                  id="search"
                  placeholder="Enter professor's name..."
                  aria-label="search"
                  aria-describedby="search-addon1"
                  ref={searchRef}
                  size="lg"
                  className="border-end-0"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
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
          </div>
        </div>

        {/* search results */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div id="searchbox">
              {classSearchFetchState.error && (
                <div className="alert alert-danger shadow-sm" role="alert">
                  <strong>Oops!</strong> {classSearchFetchState.error}
                </div>
              )}
              {classSearchFetchState.data && (
                <SearchResults searchResults={classSearchFetchState.data} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

/**
 * Handle search form submission and update the URL query parameter.
 *
 * @param {import('react').FormEvent<HTMLFormElement>} event - Form submit event (will call preventDefault())
 * @param {string} searchValue - The search string to set as the `q` query parameter
 * @param {import('next/router').NextRouter} router - Next.js router instance
 * @returns {void}
 */
function changeQuery(event, searchValue, router) {
  event.preventDefault();

  const href = `/?q=${searchValue}`;
  router.push(href, href, { shallow: true });
}
