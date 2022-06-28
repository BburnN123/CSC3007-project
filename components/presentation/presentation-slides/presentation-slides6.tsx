/* NODE MODULES */
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";
import { E_CARTOON } from "@base/utils/presentation-layout";

/* UTILS */




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
                        background-image : url(${E_CARTOON.RED_SQUARE});
                        background-repeat: no-repeat;
                        background-size: 150px;
                        background-position: bottom right;
                        
                        width: 100%;
                        height:100vh;

                        padding : 30px
                    }

                    
                `}
                </style>


                <Container fluid>
                    <div className="ctn-main">
                        <Reveal>
                            <Row className="align-items-center justify-content-center" style={{
                                marginTop: 10
                            }} >
                                <Col lg={7}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="hero-heading"
                                    >
                                        Data
                                    </Text>

                                </Col>

                                <Col lg={4}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                    >
                                        <u>
                                            Dataset Type
                                        </u>
                                    </Text>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                    >
                                        Categorical Data
                                    </Text>

                                </Col>
                            </Row>


                            <PresentationProsContsList
                                listOfText={list}
                            />
                        </Reveal>
                    </div>
                </Container>



            </>
        );
    }
}
export default PresentationSlide4;