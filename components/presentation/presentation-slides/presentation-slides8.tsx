/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide8 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [
            {
                type: "cons",
                text: "With a smaller data representation, the height and text becomes smaller. Hence, it looks clustered and hard to notice certain elements"
            },
            {
                type: "cons",
                text: "Lack of spacing. Some of the text continued on to the next line, overlapping with other text"
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
export default PresentationSlide8;