import { useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";

import "@lib/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "bootstrap/dist/css/bootstrap.min.css";

const NavbarElement = dynamic(() => import("@lib/components/NavbarElement"), { ssr: false });

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>QC Prof Stat</title>
        <meta name="description" content="Explore Queens College grade distributions" />
        <meta property="og:image" content="/qc-prof-stat-logo-200x185.png" />
        <meta property="og:type" content="website" />
      </Head>
      <>
        <NavbarElement />
        <Component {...pageProps} />
      </>
    </QueryClientProvider>
  );
}
