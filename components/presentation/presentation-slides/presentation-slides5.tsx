/* NODE MODULES */
import React from "react";
import Image from "next/image";


/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import { Container } from "react-bootstrap";



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
                        <div className="ctn-main">
                            <Image src="https://farm1.staticflickr.com/457/31520587594_d1af8b11a0_o.jpg"
                                width={1000}
                                height={700}
                                alt="case study 1" />

                        </div>

                        <Text
                            color="white"
                            fontweight="bolder"
                            type="title"
                            textAlign="center"
                        >
                            Source :
                            <a href="https://www.grida.no/resources/5413">
                                https://www.grida.no/resources/5413

                            </a>
                        </Text>
                    </Reveal>
                </Container>
            </>
        );
    }
}
export default PresentationSlide5;