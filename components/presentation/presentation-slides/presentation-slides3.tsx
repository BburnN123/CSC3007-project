/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import {
    Col, Container, Row
} from "react-bootstrap";



/* DESIGN SYSTEM */

class PresentationSlide3 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                .ctn-main{

              
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


                                <Text
                                    color="white"
                                    fontweight="bold"
                                    type="hero-heading"
                                    textAlign="center"
                                >
                                    The increase of human activities such as burning fossil fuels, causes the rapid growth of carbon dioxide.



                                </Text>


                            </Reveal>

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default PresentationSlide3;