/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide7 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "pros",
            text: "Good use of colors to differentiate the different sectors/activity (Because it is a categorical data)"
        },
        {
            type: "pros",
            text: "Is a categorical data so legend was not required as user have to look back and forth between the image and the legend"
        },
        {
            type: "cons",
            text: "Static Display "
        },
        {
            type: "cons",
            text: "Dotted lines does not clearly show the flow "
        },
        {
            type: "cons",
            text: "Overlapping flow path blocks the cognitive of the person trying to perceive"
        },

        ];

        return (
            <>

                <style jsx>{`
                
                    .ctn-main{
                        background-image: url(${E_Layout.LAYOUT3});
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                        
                        width: 100%;
                        height:100vh;
                    }

                    .txt-content{
                        position:absolute;
                        top: 150px;
                        right:250px;
                        width:61%;       
                    }

                    
                    @media screen and (min-width: 1280px) {
                       
                        .txt-content{
                            position:absolute;
                            top: 150px;
                            right:450px;
                            padding:20px;
                            width:60%;       
                        }
                    } 
                `}
                </style>



                <Reveal>
                    <div className="ctn-main">

                        <div className="txt-content">
                            <div style={{
                                marginTop: 10
                            }}>
                                <Text
                                    color="white"
                                    fontweight="bold"
                                    type="hero-heading"
                                >
                                    Idiom
                                </Text>
                            </div>


                            <PresentationProsContsList
                                listOfText={list}
                            />

                        </div>


                    </div>

                </Reveal>


            </>
        );
    }
}
export default PresentationSlide7;