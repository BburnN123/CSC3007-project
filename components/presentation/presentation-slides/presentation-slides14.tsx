/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide14 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "cons",
            text: "Bad use of colours. The chart uses a lot of colors to represent each countries and activities for each countries. "
        },
        {
            type: "cons",
            text: "As all the text used was white, it is harder to see the text when a light background is used."
        },
        {
            type: "cons",
            text: "Data is too clustered, for the smaller categories, unable to properly hover the elements from ‘Others’ category as it is very thin."
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
export default PresentationSlide14;