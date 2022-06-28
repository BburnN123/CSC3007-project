/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide13 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "pros",
            text: "Data size indicates the proportion of contribution in the emission, the bigger the size, the greater the proportion in the contribution of the emission "
        },
        {
            type: "pros",
            text: "Color distinction between the categories ie: Emission causes are the same color as the country"
        },
        {
            type: "pros",
            text: "Color fadedness is in accordance to the proportion of the emission, the more faded -> the lesser contribution to emission"
        }
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
export default PresentationSlide13;