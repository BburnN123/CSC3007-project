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

class PresentationSlide10 extends React.PureComponent {

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
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
     
                    .ctn-frame{
                        transform:scale(0.6);
                    }
                
                    #frame-content{
                        width:  1000px;
                        height: 990px;
                        border: 0;
                    }

                    @media screen and (min-width: 1280px) {

                        .ctn-frame{
                            transform:scale(0.8);
                        }
                    
                    } 

                `}
                </style>

                <Container fluid>
                    <div className="ctn-main">
                        <Reveal>

                            <Row className="align-items-center justify-content-center">
                                <Col lg={7}>

                                    <div className="ctn-frame">
                                        <iframe id="frame-content" src="https://www.wri.org/upload/circlechart2019/circle_state.htm"
                                            scrolling="no"
                                        ></iframe>
                                    </div>

                                </Col>

                                <Col lg={4}>
                                    <div>


                                        <Text
                                            color="white"
                                            fontweight="bold"
                                            type="sub-title"
                                            textAlign="right"
                                        >
                                            Source
                                            <br />
                                            <a href="https://www.wri.org/insights/interactive-chart-shows-changes-worlds-top-10-emitters">
                                                https://www.wri.org/insights/interactive-chart-shows-changes-worlds-top-10-emitters
                                            </a>
                                        </Text>
                                    </div>
                                </Col>
                            </Row>



                        </Reveal>
                    </div>
                </Container>
            </>
        );
    }
}
export default PresentationSlide10;