/* NODE MODULES */
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */

import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide4 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                .ctn-main{
                    background-image: url(${E_Layout.LAYOUT1});
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 100%;
                    height:100vh;
                 
                    display:flex;
                    justify-content:center;
                    align-items:center;

                    padding:20px;

                }`}
                </style>

                <Container fluid>
                    <Row className="align-items-center justify-content-center" style={{
                        height: "100vh",

                    }}>
                        <Col lg={8}>
                            <Reveal>
                                <div className=".ctn-main">


                                    <Text
                                        color="white"
                                        fontweight="bolder"
                                        type="hero-heading"
                                        textAlign="center"
                                    >
                                        The increase of human activities such as burning
                                        <br /><br />
                                        fossil fuels, causes the rapid growth of carbon dioxide.



                                    </Text>
                                </div>

                            </Reveal>

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default PresentationSlide4;