/* NODE MODULES */
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";
import { E_CARTOON } from "@base/utils/presentation-layout";

/* UTILS */


/* DESIGN SYSTEM */

class PresentationSlide7 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "pros",
            text: "Good use of colors to differentiate the different sectors/activity (Because it is a categorical data)"
        },
        {
            type: "pros",
            text: "Is a categorical data so legend was not required as user have to look back and forth between the image and the legend"
        },
        {
            type: "cons",
            text: "Static Display "
        },
        {
            type: "cons",
            text: "Dotted lines does not clearly show the flow "
        },


        ];

        return (
            <>

                <style jsx>{`
                
                    .ctn-main{
                        background-image : url(${E_CARTOON.BLUE_RECTANGLE});
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
                                marginBottom: 50
                            }} >
                                <Col lg={11}>
                                    <Text
                                        color="white"
                                        fontweight="bold"
                                        type="xxl-heading"
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
export default PresentationSlide7;