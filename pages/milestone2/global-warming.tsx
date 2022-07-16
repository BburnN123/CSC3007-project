/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Text from "@base/design/text";
import D3GlobalWarmingChoroplethMap from "@base/components/d3/d3-global-warming-choropleth-map";

class GlobalWarming extends React.PureComponent {
    render(): JSX.Element {
        return (
            <>
                <style>{`
                    .ctn-heading{
                        padding:30px;
                        text-align:center;
                    }
                `}</style>
                
                <div className="ctn-heading">
                    <Text
                        type="xxl-heading"
                        color="white"
                    >
                        CO<sub>2</sub> Emission
                    </Text>
                </div>

                <D3GlobalWarmingChoroplethMap
                    type="map"
                    size={{ width: 1000, height: 500 }}
                />


            </>
        );
    }
}

export default GlobalWarming;