import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LivePlayerLoading } from "../components/LivePlayer";
import "../styles/globals.css";
import { debounce } from "../util";

const MixcloudPlayer = dynamic(() => import("../components/mixcloudPlayer"), {
  ssr: false,
});

const LivePlayer = dynamic(() => import("../components/LivePlayer"), {
  ssr: false,
  loading: LivePlayerLoading,
});

function OrokoApp({ Component, pageProps }: AppProps) {
  // reload page when resizing, to keep correct slider distance
  function handleResize() {
    location.reload();
  }

  useEffect(() => {
    window.addEventListener("resize", debounce(handleResize, 500));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 500));
    };
  });

  return (
    <Fragment>
      <Header />
      <LivePlayer />

      <Component {...pageProps} />

      <MixcloudPlayer />
      <Footer />
    </Fragment>
  );
}

export default OrokoApp;
