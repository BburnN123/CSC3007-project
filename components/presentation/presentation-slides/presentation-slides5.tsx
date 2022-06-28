/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import {
    Container, Row, Col
} from "react-bootstrap";
import { E_CARTOON } from "@base/utils/presentation-layout";




/* DESIGN SYSTEM */

class PresentationSlide5 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                    .ctn-main{
                        background-image : url(${E_CARTOON.GREEN_HEX});
                        background-repeat: no-repeat;
                        background-size: 150px;
                        background-position: bottom right;
                        
                        width: 100%;
                        height:100vh;

                        padding : 30px
                      
                    }
                
                    .img-case-study{
                        width: 100%;
                        height: auto;
                    }
                `}
                </style>

                <Container fluid>
                    <div className="ctn-main">

                        <Reveal>
                            <Row className="align-items-center justify-content-center">
                                <Col lg={6}>

                                    <img className="img-case-study" src="https://farm1.staticflickr.com/457/31520587594_d1af8b11a0_o.jpg"
                                        alt="case study 1" />

                                </Col>

                                <Col lg={4}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="title"
                                        textAlign="right"
                                    >
                                        Source
                                        <br />
                                        <a href="https://www.grida.no/resources/5413">
                                            https://www.grida.no/resources/5413

                                        </a>
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
export default PresentationSlide5;