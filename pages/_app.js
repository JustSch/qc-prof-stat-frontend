import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarElement from './NavBarElement';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <NavbarElement />
    <Component {...pageProps} />
    </>

  )
}

export default MyApp
