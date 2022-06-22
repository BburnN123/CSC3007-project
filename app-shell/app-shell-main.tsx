/* NODE MODULES */
import React from "react";

/* COMPONENTS */


/* ASSETS */

/* STYLES */
interface I_Props {
    children: React.ReactNode
}


class AppShellMain extends React.PureComponent<I_Props> {

    render(): JSX.Element {

        return (
            <>
                <style jsx>{`
                    .ctn-header-logo{
                       display: flex;
                       padding: 20px;
                    }
                    .ctn-body{
                        padding : 0px 50px;
                    }
                `}</style>

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB+Garamond"></link>
                <div>
                    {this.props.children}
                </div>

            </>
        );
    }
}

export default AppShellMain;