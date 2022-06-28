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

class PresentationSlide10 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>

                <style jsx>{`
                
                .ctn-main{
                   
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    

                }`}
                </style>

                <Container fluid>
                    <Reveal>

                        <div className="ctn-main">
                            <div style={{
                                position: "absolute",
                                top:      30
                            }}>
                                <Text
                                    color="white"
                                    fontweight="bold"
                                    type="title"
                                    textAlign="center"
                                >
                         
                                    <a href="https://www.wri.org/insights/interactive-chart-shows-changes-worlds-top-10-emitters">
                                        https://www.wri.org/insights/interactive-chart-shows-changes-worlds-top-10-emitters
                                    </a>
                                </Text>
                            </div>

                            <div>
                                <iframe src="https://www.wri.org/upload/circlechart2019/circle_state.htm"
                                    scrolling="no"
                                    style={{
                                        width:  1000,
                                        height: 990,
                                        border: 0,

                                        transform: "scale(0.7)"
                                    }}></iframe>
                            </div>

                        </div>

                    </Reveal>
                </Container>
            </>
        );
    }
}
export default PresentationSlide10;