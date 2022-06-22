/* NODE MODULES */
import React from "react";

/* STYLES */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppShellMain from "@base/app-shell/app-shell-main";

/* UTILS */



class MyApp extends React.PureComponent<AppProps>{

  constructor(props: AppProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { Component, pageProps } = this.props;

    return (
      <>
        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />

        <AppShellMain>
          <Component {...pageProps} />
        </AppShellMain>
      </>

    );
  }

}

export default MyApp;