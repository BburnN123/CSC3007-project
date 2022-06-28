/* NODE MODULES */
import React from "react";
import Image from "next/image";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import {
    Container, Row, Col
} from "react-bootstrap";



/* DESIGN SYSTEM */

class PresentationSlide15 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                .txt-title{
                    margin-top:50px;
                    padding:20px;
                }

                .ctn-main{
                    padding:0 20px;
                    
                }`}
                </style>

                <Container fluid>
                    <Reveal>
                        <div className="ctn-main">
                            <div className="txt-title">
                                <Text
                                    color="white"
                                    fontweight="bold"
                                    type="xxl-heading"
                                    textAlign="right"
                                >
                                    Proposal
                                </Text>
                            </div>

                            <Row className="align-items-center justify-content-center" style={{
                                marginTop: 10
                            }} >
                                <Col lg={7}>
                                    <div className="ctn-main">
                                        <Image src="/milestone1/image/proposal_force_diagram.png"
                                            width={1000}
                                            height={700}
                                            alt="case study 1" />

                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="heading"
                                        textAlign="right"
                                    >
                                        From Case Study 1 and 2
                                    </Text>
                                    <br />

                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                        textAlign="right"
                                    >
                                        <u>
                                            What
                                        </u>

                                        <br />
                                        Shows how much GHG each sector is producing over the year. A board will show the break down of the GHG.
                                    </Text>
                                    <br />
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                        textAlign="right"
                                    >
                                        <u>
                                            Data
                                        </u>

                                        <br />
                                        GHG Emission by Sector and Year
                                    </Text>
                                    <br />
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                        textAlign="right"
                                    >
                                        <u>
                                            Idioms
                                        </u>

                                        <br />
                                        <ul>
                                            <li>Force Diagram</li>
                                            <li>Pie Chart</li>
                                            <li>Statistic Table</li>
                                        </ul>
                                    </Text>

                                </Col>
                            </Row>
                        </div>


                    </Reveal>
                </Container>
            </>
        );
    }
}
export default PresentationSlide15;