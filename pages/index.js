import Head from 'next/head'
import Image from 'next/image'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';



export default function Home() {
  return (
    <>
      <Container>
        {/* add image or something to padd space after navbar */} 
        <InputGroup className="mb-3 mt-5">
          <Form.Control
            placeholder="Search"
            aria-label="search"
            aria-describedby="search-addon1"
          />
          <Button variant="outline-secondary" id="button-addon1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </InputGroup>

      </Container>

    </>
  )
}
