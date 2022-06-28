/* NODE MODULES */
import React from "react";
import Image from "next/image";

/* COMPONENTS */
import Text from "@base/design/text";

class PresentationArrowKey extends React.PureComponent {

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`

                .ctn-arrow{
                    display:inline;
                }

                .arrow {
                    width:20px;
                    height:20px;
                    display: inline-block;
                    padding: 20px;
                }
   
                `}</style>
                <div className="ctn-arrow">
                    <Text
                        color="warning"
                        fontweight="bolder"
                        type="title"
                        textAlign="right">
                        Use the Arrow Key to Contiune &nbsp;


                        <Image src="/icon/arrows.png"
                            className="arrow-key-icon"
                            width={100}
                            height={50}
                            alt="case study 1" />

                    </Text>



                </div>

            </>
        );
    }
}

export default PresentationArrowKey;