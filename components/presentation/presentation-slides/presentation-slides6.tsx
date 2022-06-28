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

class PresentationSlide4 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "pros",
            text: "Clear Quantitative values"
        },
        {
            type: "pros",
            text: "Data is categorized in descending order in terms of percentage (Carbon dioxide, Methane and Nitrous Oxide)"
        },
        {
            type: "cons",
            text: "Mixture of data. Example: Oil/Gas Extraction carbon dioxide and methane percentage was mixed. It doesn’t show how much percentage of CO2 and methane are produced individually. "
        },
        {
            type: "cons",
            text: "Negative dataset trying to offset the green house emission as the purpose of the data visualization is trying to show the greenhouse gas emissions"
        },

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
                                <Col lg={2}>
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
                                        Categorical Data
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
export default PresentationSlide4;