/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import {
    Container, Row, Col
} from "react-bootstrap";
import { E_Layout } from "@base/utils/presentation-layout";
import D3ChoroplethMap from "@base/components/d3/d3-choropleth-map";



/* DESIGN SYSTEM */

class PresentationSlide17 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                .ctn-main{
                    background-image: url(${E_Layout.LAYOUT2});
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    width: 100%;
                    height:100vh;

            
                }
                `}
                </style>

                <Container fluid>
                    <Reveal>
                        <div className="ctn-main">
                            <div className="txt-title">
                                <Row className="align-items-center justify-content-center" style={{
                                    height: "80vh",

                                }}>
                                    <Col lg={7}>
                                        <D3ChoroplethMap
                                            type="globe"
                                            drawGraticules={false}
                                            enableRotation={true}
                                        />
                                    </Col>
                                    <Col lg={5} >
                                        <Reveal>
                                            <Text
                                                color="white"
                                                fontweight="bold"
                                                type="xxl-heading"
                                                textAlign="right"
                                            >
                                                Thank you!
                                            </Text>
                                            <br />
                                            <Text
                                                color="warning"
                                                fontweight="bold"
                                                type="hero-heading"
                                                textAlign="right"
                                            >
                                                Any Questions?
                                            </Text>
                                        </Reveal>

                                    </Col>

                                </Row>

                            </div>


                        </div>


                    </Reveal>
                </Container>
            </>
        );
    }
}
export default PresentationSlide17;