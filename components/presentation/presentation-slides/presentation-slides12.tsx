/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";
import { Col, Row } from "react-bootstrap";



/* DESIGN SYSTEM */

class PresentationSlide12 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "cons",
            text: "The data displayed only shows the emission of the GHG but it does not provide a clear linkage to the consequences of emissions in GHG. "
        }
        ];

        return (
            <>

                <style jsx>{`
                
                    .ctn-main{
                        background-image: url(${E_Layout.LAYOUT4});
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

                            <Row className="align-items-center justify-content-center" style={{
                                marginTop: 10
                            }} >
                                <Col lg={6}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="hero-heading"
                                    >
                                        Data
                                    </Text>

                                </Col>
                                <Col lg={2} >
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                    >
                                        Dataset:


                                    </Text>

                                </Col>
                                <Col lg={4}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                    >
                                        Categorical Data <br /> Quantitative Data


                                    </Text>

                                </Col>
                            </Row>

                            <div style={{
                                marginTop: 10
                            }}>

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
export default PresentationSlide12;