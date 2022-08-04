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
import { E_CARTOON } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide15 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`

                .ctn-main{
                    background-image : url("${E_CARTOON.PURPLE_CIRCLE}");
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
                                marginBottom: 50
                            }} >
                                <Col lg={11} sm={12}>

                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="xxl-heading"
                                        textAlign="right"
                                    >
                                        Proposal
                                    </Text>

                                </Col>
                            </Row>

                            <Row className="align-items-center justify-content-center" style={{
                                marginTop: 10
                            }} >
                                <Col lg={7}>

                                    <Image src="/milestone1/image/proposal_force_diagram.png"
                                        width={800}
                                        height={600}
                                        alt="case study 1" />


                                </Col>
                                <Col lg={3}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="heading"
                                        textAlign="right"
                                    >
                                        From Case Study 1 and 2
                                    </Text>
                                    <br />
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

                                </Col>
                            </Row>
                        </Reveal>
                    </div>
                </Container>
            </>
        );
    }
}
export default PresentationSlide15;