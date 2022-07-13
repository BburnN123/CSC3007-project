/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import D3GlobalWarmingChoroplethMap from "@base/components/d3/d3-global-warming-choropleth-map";

class GlobalWarming extends React.PureComponent {
    render(): JSX.Element {
        return (
            <>
                <D3GlobalWarmingChoroplethMap
                    type="map"
                    drawGraticules={true}
                    size={{ width: 1000, height: 500 }}
                />

            </>
        );
    }
}

export default GlobalWarming;