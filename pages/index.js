import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup, Spinner } from 'react-bootstrap';
import useSearchResult from '../js/useSearchResult';
import createGroupSearchResult from '../js/createGroupSearchResults';
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function Home() {
  let router = useRouter();

  const { data: resultJSON, error, isLoading } = useSearchResult(router.query.q);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    if (searchRef.current.value === '' && router.query.q) {
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
      <Container>
        <p className="mb-3 mt-5 text-center">Search for a Professor by their <b>Last Name</b> or <b>Last Name, First Initial</b></p>
        <form onSubmit={(event) => changeQuery(event, searchValue, router)}>
          <InputGroup className="mb-3">
            <Form.Control
              id="search"
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-addon1"
              ref={searchRef}
              onChange={(e) => { setSearchValue(e.target.value) }}
            />
            <Button type="submit" variant="outline-secondary" id="button-addon1" disabled={isLoading}>
              {!isLoading && <FontAwesomeIcon icon={faMagnifyingGlass} />}
              {isLoading && (
                <Spinner variant="primary" animation="border" role="status" size={"sm"}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </InputGroup>
        </form>
        <div id="searchbox" className=''>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {resultJSON && createGroupSearchResult(resultJSON)}
        </div>
      </Container>

    </>
  )
}

function changeQuery(event, searchValue, router) {
  event.preventDefault();
  
  const href = `/?q=${searchValue}`;
  router.push(href, href, { shallow: true });
}
