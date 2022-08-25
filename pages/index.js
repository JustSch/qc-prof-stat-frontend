import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import useSearchResult from '../js/useSearchResult';
import createGroupSearchResult from '../js/createGroupSearchResults'
import { useRouter } from 'next/router';


export default function Home() {
  let router = useRouter();
   
  const {data: resultJSON, error}= useSearchResult(router.query.q);
  const searchRef = useRef(null);
  useEffect(() => {
    if (searchRef.current.value === '' && router.query.q) {
      searchRef.current.value = router.query.q;
    }
  }, [router.query.q]);
  return (
    <>
      <Container>
        <p className="mb-3 mt-5 text-center">Search For a Professor By Their Last Name Or Last Name, First Initial</p>
        <InputGroup className="mb-3">
          <Form.Control
            id="search"
            placeholder="Search"
            aria-label="search"
            aria-describedby="search-addon1"
            ref={searchRef}
            onChange={(e) => { changeQuery(e, router) }}
          />         
        </InputGroup>
        <div id="searchbox" className=''>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {resultJSON && createGroupSearchResult(resultJSON)}
        </div>
      </Container>

    </>
  )
}

const changeQuery = (e, router) => {
  const href = `/?q=${e.target.value}`;
  router.push(href, href, { shallow: true });
}
