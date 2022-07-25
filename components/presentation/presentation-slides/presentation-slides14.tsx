/* NODE MODULES */
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_CARTOON } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide14 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "cons",
            text: "Bad use of colours. The chart uses a lot of colors to represent each countries and activities for each countries. "
        },
        {
            type: "cons",
            text: "As all the text used was white, it is harder to see the text when a light background is used."
        },
        {
            type: "cons",
            text: "Data is too clustered, for the smaller categories, unable to properly hover the elements from ‘Others’ category as it is very thin."
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
export default PresentationSlide14;