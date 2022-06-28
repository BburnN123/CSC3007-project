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

class PresentationSlide16 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                .txt-title{
                    margin-top:50px;
                    padding:20px;
                }

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
                                <Col lg={11}>

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

                                    <Image src="/milestone1/image/proposal_chorelpth_map.png"
                                        width={800}
                                        height={600}
                                        alt="case study 1" />


                                </Col>
                                <Col lg={4}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="heading"
                                        textAlign="right"
                                    >
                                        From Case Study 2
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
                                            Idioms
                                        </u>

                                        <br />
                                        <ul>
                                            <li>Choropleth Map</li>
                                            <li>Temperature Color
                                                <ul>
                                                    <li>Ex. Blue to Red</li>
                                                </ul>
                                            </li>
                                        </ul>
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
export default PresentationSlide16;