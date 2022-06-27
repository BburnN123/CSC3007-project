/* NODE MODULES */
import React from "react";
import { Col, Row } from "react-bootstrap";

/* COMPONENTS */
import ChoroplethMap from "@base/components/choropleth-map";
import Text from "@base/design/text";
import TextAnimation from "@base/design/text-animation";

class HomePage extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`
                    .ctn-home{
                        display: grid;
                        align-items: center;
                        height: 100vh;
                       
                        margin:auto;

                        background-image: url("/image/bg-img.jpg");
                        background-image: url(/image/bg-img.jpg);
                        background-repeat: no-repeat;
                        background-size: cover;
                        box-shadow:inset 0 0 0 2000px rgba(0, 0, 0, 0.3);
                    }
                    }

                `}</style>
                <div className="ctn-home">


                    <Row className="align-items-center justify-content-center">
                        <Col lg={7}>
                            <ChoroplethMap
                                type="globe"
                                drawGraticules={false}
                                enableRotation={true}
                            />
                        </Col>
                        <Col lg={5} >
                            <TextAnimation words={["CO<sub>2</sub> Gashouse <br/> Emission", "Human Activities"]} />
                            < Text type="xxl-heading" color="white" fontweight="bold" >

                            </Text>
                        </Col>

                    </Row>

                </div>
            </>
        )
    }
}

export default HomePage