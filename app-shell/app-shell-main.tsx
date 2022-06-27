/* NODE MODULES */
import React from "react";
import { Container } from "react-bootstrap";

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

                    // .ctn-body{
                    //     width:100%;
                    //     height: 100vh;
                    //     // background: #00b09b;
                    //     // background: linear-gradient(to right, #96c93d, #00b09b);
                      
                       
                    // }
                   
                `}</style>



                <div className="ctn-body">
                 
                    {this.props.children}
                  
                </div>


            </>
        );
    }
}

export default AppShellMain;