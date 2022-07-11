/* NODE MODULES */
import React from "react";


/* COMPONENTS */

/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";

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
                    .ctn-body{
                        width:100%;
                        height: 100vh;
                        background-image: url(${E_Layout.PLAINLAYOUT});
                        background-repeat: no-repeat;
                        background-size: cover;
   
                    }
                   
                `}</style>



                <div className="ctn-body">
                 
                    {this.props.children}
                  
                </div>


            </>
        );
    }
}

export default AppShellMain;