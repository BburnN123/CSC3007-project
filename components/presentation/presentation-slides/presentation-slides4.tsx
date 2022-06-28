/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide4 extends React.PureComponent {

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
                                Case Study 1
                            </Text>
                            <br />
                            <br />

                            <Text
                                color="blue"
                                fontweight="bolder"
                                type="hero-heading"
                                textAlign="center"
                            >
                                Alluvial Diagram
                            </Text>
                            <br />
                            <br />

                            <Text
                                color="white"
                                fontweight="bold"
                                type="sub-heading"
                                textAlign="center"
                            >
                                Display how each sector contributed to greenhouse gasses(GHG). The sector is further broken down into different types of human activities. Dotted lines represent flow of less than 0.1% percent of the total GHG emissions.

                            </Text>
                        </div>
                    </div>
                </Reveal>
            

      


            </>
        );
    }
}
export default PresentationSlide4;