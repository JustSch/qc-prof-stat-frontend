import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import NavbarElement from './NavBarElement';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>QC Prof Stat</title>
    </Head>
    <NavbarElement />
    <Component {...pageProps} />
    </>

  )
}

export default MyApp
