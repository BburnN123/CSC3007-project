/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Text from "@base/design/text";

export type T_ProConList = {
    type: "pros" | "cons",
    text: string
}

interface I_Props {
    listOfText: T_ProConList[]
}
class PresentationProsContsList extends React.PureComponent<I_Props> {

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`
                
                    .ul-list-items{
                        padding: 0px 10px;
                        margin:auto;
                        width: 85%;
                    }

                    .ul-list-items li{
                        padding:20px 0px;
                    }

                    .ul-list-items li.cons::before {
                        content: '';
                        position:absolute;
                        display: inline-block;
                        height: 70px;
                        width: 70px;
                        left:35px;
                        background-size:contain;
                        background-image: url('milestone1/image/cross.png');
                    }

                    .ul-list-items li.pros::before {
                        content: '';
                        position:absolute;
                        display: inline-block;
                        height: 70px;
                        width: 70px;
                        left:35px;
                        background-size:contain;
                        background-image: url('milestone1/image/tick.png');
                    }

                    @media screen and (max-width: 1280px) {

                        .ul-list-items li.cons::before, .ul-list-items li.pros::before {
                            height: 60px;
                            width: 60px;
                            left:20px;
                        }

                    } 

                `}</style>

                <ul className="ul-list-items">
                    {this.props.listOfText.map((list, index) => (
                        <li key={index} className={`${list.type}`}>
                            <Text
                                color="white"
                                type="title"
                            >
                                {list.text}
                            </Text>
                        </li>
                    ))}

                </ul>

            </>
        );
    }
}

export default PresentationProsContsList;