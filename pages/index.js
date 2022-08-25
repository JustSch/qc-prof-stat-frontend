import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import useSearchResult from '../js/useSearchResult';
import createGroupSearchResult from '../js/createGroupSearchResults'
import { useRouter } from 'next/router';


export default function Home() {
  let router = useRouter();
  const resultJSON = useSearchResult(router.query.q);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current.value === '' && router.query.q) {
      searchRef.current.value = router.query.q;
    }
  }, [router.query.q]);
  return (
    <>
      <Container>
        {/* add image or something to padd space after navbar */}
        {/* possibly add screenshot of result when result page is finished*/}

        {/* have enter button or search icon pressed open seperate search page with params passed */}

        {/* Error checking for when no professor found*/}
        {/* Do something like https://bobbyhadz.com/blog/react-pass-function-as-prop and check tutorial*/}

        {/* Error message when empty or hook will get 404*/}
        {/* React hooks are slow maybe dont use?*/}
        {/* when search empty on search page redirect to homepage? probably best to just have error*/}

        {/* Have message when empty and unknown professor on search page (detects onchange)*/}
        {/* Homepage will have error when user attempts search ie: button or pressing enter (does not use onchange)*/}
        {/* unknown professor is 404. empty textbox or searchName state null is empty input*/}

        <p className="mb-3 mt-5 text-center">Search For a Professor By Their Last Name Or Last Name, First Initial</p>
        <InputGroup className="mb-3">
          <Form.Control
            id="search"
            placeholder="Search"
            aria-label="search"
            aria-describedby="search-addon1"
            ref={searchRef}
            onChange={(e) => { changeQuery(e, router) }}
          //setSearchName(e.target.value)
          // onKeyUp={() => {if (typeof window !== 'undefined') {searchProfessor()}}} //use only on search page not home page
          //onKeyDown={(e) => { if (typeof window !== 'undefined' && e.key === 'Enter')  { console.log() }}}
          />
          {/* <Button variant="outline-secondary" id="button-addon1" onClick={() => { if (typeof window !== 'undefined') { searchProfessor() } }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button> */}
        </InputGroup>
        <div id="searchbox" className=''>
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
