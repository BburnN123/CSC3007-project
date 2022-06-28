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
                    .ul-list-items li{
                   
                        padding:8px;
                    }

                    .ul-list-items li.cons::before {
                        content: '';
                        position:absolute;
                        left:-40px;
                        display: inline-block;
                        height: 50px;
                        width: 50px;
            
                        background-size:contain;
                        background-image: url('milestone1/image/cross.png');
                    }

                    .ul-list-items li.pros::before {
                        content: '';
                        position:absolute;
                        left:-40px;
                        display: inline-block;
                        height: 50px;
                        width: 50px;
            
                        background-size:contain;
                        background-image: url('milestone1/image/tick.png');
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