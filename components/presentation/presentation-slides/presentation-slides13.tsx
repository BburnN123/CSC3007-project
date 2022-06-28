/* NODE MODULES */
import React from "react";
import {
    Col, Row, Container
} from "react-bootstrap";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";
import PresentationProsContsList, { T_ProConList } from "@base/components/presentation/presentation-pros-cons-list";

/* UTILS */

import { E_CARTOON, E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide13 extends React.PureComponent {

    render(): JSX.Element {

        const list: T_ProConList[] = [ {
            type: "pros",
            text: "Data size indicates the proportion of contribution in the emission, the bigger the size, the greater the proportion in the contribution of the emission "
        },
        {
            type: "pros",
            text: "Color distinction between the categories ie: Emission causes are the same color as the country"
        },
        {
            type: "pros",
            text: "Color fadedness is in accordance to the proportion of the emission, the more faded -> the lesser contribution to emission"
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
export default PresentationSlide13;