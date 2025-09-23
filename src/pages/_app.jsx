import dynamic from "next/dynamic";
import Head from "next/head";

import "@lib/styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";

const NavbarElement = dynamic(() => import("./navbar-element"), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>QC Prof Stat</title>
      </Head>
      <>
        <NavbarElement />
        <Component {...pageProps} />
      </>
    </>
  );
}
