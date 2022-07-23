import React from "react";
import D3Circle from "@base/components/d3/d3-circle";

import Text from "@base/design/text";

interface I_Props {
    year: number
    country: string
}

class GlobalWarmingToolTip extends React.PureComponent<I_Props> {

    render(): JSX.Element {
        return (
            <>
                <style>{`
                    #tooltip{
                        position: relative;
                        height: 100%;
                        // background : rgba(0,0,0,0.4);
                        background: #FFFFFF;
                        color: #FFFFFF;
                        width : 100%;
                        text-align : center;
                    }`
                }</style>

                <div id="tooltip">
                    <Text type="heading">
                        {this.props.country}
                    </Text>



                </div>
            </>
        );
    }
}

export default GlobalWarmingToolTip;