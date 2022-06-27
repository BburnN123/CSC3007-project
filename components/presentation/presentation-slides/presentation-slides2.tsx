/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Reveal from "@base/design/reveal";
import Text from "@base/design/text";

/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";



/* DESIGN SYSTEM */

class PresentationSlide2 extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`
                
                .ctn-main{
                    background-image: url(${E_Layout.PLAINLAYOUT});
                    background-repeat: no-repeat;
                    background-size: cover;
                    
                    width: 100vw;
                    height:100vh;

                    display:flex;
                    justify-content:center;
                    align-items:center;

                }`}
                </style>

                <div className="ctn-main">

                    <Reveal>
                        <Text
                            color="white"
                            fontweight="bolder"
                            type="xxl-heading"
                            textAlign="center">
                            Dog
                        </Text>
                        <br />
                        <Text
                            color="white"
                            fontweight="bolder"
                            type="title"
                            textAlign="center">
                            Aeron Heng Jian Zhong 1901847
                            <br />
                            Shaun Yam Zhan Hui 1901871
                            <br />
                            Gay Hui Jie 1901866

                        </Text>
                    </Reveal>
                </div>


            </>
        );
    }
}
export default PresentationSlide2;