import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const NavbarElement = dynamic(() => import('./NavBarElement'), { ssr: false })
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
