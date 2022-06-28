/* NODE MODULES */
import React from "react";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import {
    Col, Row, Container
} from "react-bootstrap";
import { E_CARTOON } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide12 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "cons",
            text: "The data displayed only shows the emission of the GHG but it does not provide a clear linkage to the consequences of emissions in GHG. "
        }
        ];

        return (
            <>

                <style jsx>{`
                    .ctn-main{
                        background-image : url("${E_CARTOON.BLUE_RECTANGLE}");
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
                                marginTop: 10
                            }} >
                                <Col lg={11}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="hero-heading"
                                    >
                                        Idiom
                                    </Text>

                                </Col>
                            </Row>

                            <PresentationProsContsList
                                listOfText={list}
                            />
                        </Reveal>
                    </div>
                </Container>

            </>
        );
    }
}
export default PresentationSlide12;