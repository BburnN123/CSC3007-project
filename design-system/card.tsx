/* NODE MODULES */
import React from "react";

/* STYLES */

/* TYPES */
interface I_Props {
    children: React.ReactNode
}
class Card extends React.PureComponent<I_Props> {

    render(): JSX.Element {

        return (
            <>
                <style jsx>{`
                    .card{
                        width:100%;
                        height:auto;
                        padding:30px;
                        background: #FFF;
                        border-radius: 25px;
                    }
                `}</style>

                <div className="card">
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Card