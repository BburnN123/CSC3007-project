/* NODE MODULES */
import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";

/* STYLES */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppShellMain from "@base/app-shell/app-shell-main";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

/* UTILS */



class MyApp extends React.PureComponent<AppProps>{

    constructor(props: AppProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { Component, pageProps } = this.props;

        return (
            <>
                <SSRProvider>
                 
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>


                    <AppShellMain>
                        <Component {...pageProps} />
                    </AppShellMain>
                </SSRProvider>
            </>

        );
    }

}

export default MyApp;