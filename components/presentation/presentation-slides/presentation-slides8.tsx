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

        const list: T_ProConList[] = [
            {
                type: "cons",
                text: "Overlapping flow path blocks the cognitive of the person trying to perceive"
            },
            {
                type: "cons",
                text: "With a smaller data representation, the height and text becomes smaller. Hence, it looks clustered and hard to notice certain elements"
            },
            {
                type: "cons",
                text: "Lack of spacing. Some of the text continued on to the next line, overlapping with other text"
            },
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
export default PresentationSlide7;