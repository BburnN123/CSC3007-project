/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import D3ChoroplethMap from "@base/components/d3/d3-choropleth-map";

/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";
import {
    Row, Col, Container
} from "react-bootstrap";
import PresentationArrowKey from "@base/components/presentation/presentation-arrow-key";



/* DESIGN SYSTEM */

class PresentationSlide1 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`
                
                .ctn-main{
                    background-image: url(${E_Layout.PLAINLAYOUT});
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 100%;
                    height:100vh;
                }`}
                </style>



                <div className="ctn-main">
                    <Container fluid>
                        <Row className="align-items-center justify-content-center" style={{
                            height: "100vh",

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
                                        fontweight="bolder"
                                        type="xxl-heading"
                                    >
                                        Greenhouse Gases Emission
                                    </Text>
                                    <br />
                                    <Text
                                        color="white"
                                        fontweight="bolder"
                                        type="title"
                                        textAlign="right">
                                        Aeron Heng Jian Zhong 1901847
                                        <br />
                                        Shaun Yam Zhan Hui 1901871
                                        <br />
                                        Gay Hui Jie 1901866

                                    </Text>
                                    <br />

                                    <PresentationArrowKey />
                                </Reveal>

                            </Col>

                        </Row>
                    </Container>

                </div>


            </>
        );
    }
}
export default PresentationSlide1;