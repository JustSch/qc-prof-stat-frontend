import dynamic from "next/dynamic";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.css";

const NavbarElement = dynamic(() => import("./NavBarElement"), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>QC Prof Stat</title>
      </Head>
      <NavbarElement />
      <Component {...pageProps} />
    </>
  );
}
