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
          Database last updated for Spring 2022
          <br />
          <a href="https://www.donatingplasma.org/donation/find-a-donor-center">Please Consider Donating Blood Plasma</a>
        </div>
      </Container>
    </>
  )
}

export default Acknowledgments