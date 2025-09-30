import { useEffect, useRef, useState } from "react";

import { Button, Card, Container, Form, InputGroup, ListGroup, Spinner } from "react-bootstrap";

import Head from "next/head";
import { useRouter } from "next/router";

import { faGraduationCap, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SearchResults } from "@lib/components/SearchResults";
import { useNextFetch } from "@lib/hooks/useNextFetch";
import { buildInstructorApiUrl } from "@lib/utils/url-builder";

export default function Page() {
  const router = useRouter();

  const classSearchFetchState = useNextFetch(router.query, buildInstructorApiUrl(router.query.q));
  const [searchHistory, setSearchHistory] = useState([]);

  const searchInputRef = useRef(null);
  const searchFormRef = useRef(null);

  const SEARCH_HISTORY_KEY = "qc-prof-stat-search-history";
  const MAX_SEARCH_HISTORY = 10;

  // load search history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.warn("Failed to load search history:", error);
    }
  }, []);

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

  // save search history to localStorage
  function saveSearchHistory(history) {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
      setSearchHistory(history);
    } catch (error) {
      console.warn("Failed to save search history:", error);
    }
  }

  // add search query to history
  function addToSearchHistory(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const newHistory = [trimmedQuery];

    // add other items provided they don't match the current query
    for (const item of searchHistory) {
      if (item !== trimmedQuery && newHistory.length < MAX_SEARCH_HISTORY) {
        newHistory.push(item);
      }
    }

    saveSearchHistory(newHistory);
  }

  /**
   * Handle search form submission and update the URL query parameter.
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event (will call preventDefault())
   * @returns {void}
   */
  function handleSearchSubmission(event) {
    event.preventDefault();

    const searchValue = searchInputRef.current.value.trim();
    if (searchValue === "") return;

    if (searchValue === router.query.q) return;

    addToSearchHistory(searchValue);

    const params = new URLSearchParams({ q: searchValue });
    const href = `/?${params.toString()}`;

    router.push(href, undefined, { shallow: true });
  }

  /**
   * @param {string} query - The search query to execute
   */
  function handleHistoryItemClick(query) {
    searchInputRef.current.value = query;

    searchFormRef.current.requestSubmit();
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

            <form onSubmit={handleSearchSubmission} ref={searchFormRef}>
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
          </div>
        </div>

        {/* search results */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 col-xl-6">
            <div>
              {classSearchFetchState.errorMessage && (
                <div className="alert alert-danger shadow-sm" role="alert">
                  <strong>Oops!</strong> {classSearchFetchState.errorMessage}
                </div>
              )}

              {/* search history - show when no active search or if there's a search error */}
              {searchHistory.length > 0 &&
                (!router.query.q || !!classSearchFetchState.errorMessage) && (
                <div>
                  <Card className="shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0 text-muted">Recent Searches</h5>
                    </Card.Header>
                    <ListGroup variant="flush">
                      {searchHistory.map((query, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleHistoryItemClick(query)}
                          className="d-flex align-items-center py-3"
                          style={{ cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-muted me-3" />
                          <span>{query}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </div>
              )}

              {classSearchFetchState.data && (
                <SearchResults classResults={classSearchFetchState.data} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
