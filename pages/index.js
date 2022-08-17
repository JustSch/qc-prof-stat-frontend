import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import searchProfessor from '../js/searchProfessor';


export default function Home() {
  return (
    <>
      <Container>
        {/* add image or something to padd space after navbar */}
        {/* possibly add screenshot of result when result page is finished*/} 

        {/* have enter button or search icon pressed open seperate search page with params passed */}
        {/* meta tags for title etc*/}
        {/* Error checking for when no professor found*/}
        {/* use searchProfessor.js to get json then give to seperate react component that maps to cards*/}
        {/* Do something like https://bobbyhadz.com/blog/react-pass-function-as-prop and check tutorial*/}
        {/* Needs to wait for json response before rendering react component cards*/}

        <p className="mb-3 mt-5 text-center">Search For a Professor By Their Last Name Or Last Name, First Initial</p>
        <InputGroup className="mb-3">
          <Form.Control
            id="search"
            placeholder="Search"
            aria-label="search"
            aria-describedby="search-addon1"
            // onKeyUp={() => {if (typeof window !== 'undefined') {searchProfessor()}}} //use only on search page not home page
            onKeyDown={(e) => {if (typeof window !== 'undefined' && e.key==='Enter') {console.log(searchProfessor())}}}
          />
          <Button variant="outline-secondary" id="button-addon1" onClick={() => {if (typeof window !== 'undefined') {searchProfessor()}}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </InputGroup>
        <div id="searchbox" className='text-center'>

        </div>
      </Container>

    </>
  )
}
