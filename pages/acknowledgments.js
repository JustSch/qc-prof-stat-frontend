import { Container} from "react-bootstrap";

const Acknowledgments = () => {
  return (
    <>
      <Container>
        <div className="mt-2 text-center">
          Currently Maintained By <a href="https://www.linkedin.com/in/justin-schreiber/">Justin Schreiber</a>
          <br />
          Originally Created by <a href="https://www.linkedin.com/in/sabeet/">Sabeet A. Chowdhury</a>
          <br />
          Database last updated with Fall 2023
          <br />
          <a href="https://www.plasmahero.org">Please Consider Donating Blood Plasma</a>
          <br />
          With Contributions from <a href="https://github.com/mmonj">mmonj</a> on <a href="https://github.com">github</a>
        </div>
      </Container>
    </>
  )
}

export default Acknowledgments