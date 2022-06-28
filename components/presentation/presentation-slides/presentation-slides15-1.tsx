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

class PresentationSlide5 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                .ctn-main{
                    margin-top:20px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    padding:20px;

                }`}
                </style>

                <Container fluid>
                    <Reveal>
                        <Text
                            color="white"
                            fontweight="bold"
                            type="title"
                            textAlign="center"
                        >
                            Source :
                            <a href="https://www.grida.no/resources/5413">
                                https://www.grida.no/resources/5413

                            </a>
                        </Text>
                        <Row className="align-items-center justify-content-center" style={{
                            marginTop: 10
                        }} >
                            <Col>
                                <div className="ctn-main">
                                    <Image src="/milestone1/image/proposal_chorelpth_map.png"
                                        width={1000}
                                        height={700}
                                        alt="case study 1" />

                                </div>
                            </Col>
                            <Col>
                                <Text
                                    color="white"
                                    fontweight="bold"
                                    type="title"
                                    textAlign="center"
                                >
                                    Source :
                                    <a href="https://www.grida.no/resources/5413">
                                        https://www.grida.no/resources/5413

                                    </a>
                                </Text>
                            </Col>
                        </Row>



                    </Reveal>
                </Container>
            </>
        );
    }
}
export default PresentationSlide5;