import { Container} from "react-bootstrap";

const Acknowledgments = () => {
  return (
    <>
      <Container>
        <div className="mt-2 text-center">
          Currently Maintained By Justin Schreiber
          <br />
          Originally Created by Sabeet A. Chowdhury
          <br />
          Database last updated for Fall 2022
          <br />
          <a href="https://www.plasmahero.org">Please Consider Donating Blood Plasma</a>
        </div>
      </Container>
    </>
  )
}

export default Acknowledgments