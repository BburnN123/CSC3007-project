/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide9 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                    .ctn-main{
                        background-image: url(${E_Layout.LAYOUT1});
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                        
                        width: 100%;
                        height:100vh;
                    
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }

                    .txt-content{
                        width:50%;
                    }
                `}
                </style>



                <Reveal>
                    <div className="ctn-main">

                        <div className="txt-content">
                            <Text
                                color="error"
                                fontweight="bolder"
                                type="xxl-heading"
                                textAlign="center"
                            >
                                Case Study 2
                            </Text>
                            <br />
                            <br />

                            <Text
                                color="blue"
                                fontweight="bolder"
                                type="hero-heading"
                                textAlign="center"
                            >
                               Interactive Pie Chart
                            </Text>
                            <br />
                            <br />

                            <Text
                                color="white"
                                fontweight="bold"
                                type="sub-heading"
                                textAlign="center"
                            >
                                Display an interactive chart displaying the GHG emissions by country and economic sector. 


                            </Text>
                        </div>


                    </div>

                </Reveal>


            </>
        );
    }
}
export default PresentationSlide9;