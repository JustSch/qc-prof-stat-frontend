import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useRef, useEffect, useState } from 'react';
import useSearchResult from '../js/useSearchResult';
import createGroupSearchResult from '../js/createGroupSearchResults';
import { useRouter } from 'next/router';


export default function Home() {
  let router = useRouter();

  const { data: resultJSON, error } = useSearchResult(router.query.q);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
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
            onChange={(e) => { setSearchValue(e.target.value) }}
            onKeyDown={(e) => { if (typeof window !== 'undefined' && e.key === 'Enter') { changeQuery(searchValue, router) } }}
          />
          <Button variant="outline-secondary" id="button-addon1" onClick={() => { changeQuery(searchValue, router) }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>

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
  const href = `/?q=${e}`;
  router.push(href, href, { shallow: true });
}
