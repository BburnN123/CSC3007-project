/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Text from "@base/design/text";
import D3GlobalWarmingChoroplethMap from "@base/components/d3/d3-global-warming-choropleth-map";
import D3HorizontalBarChart from "@base/components/d3/d3-horizontal-barchart";
import Reveal from "@base/design/reveal";
import GlobalWarmingSpeedometer from "@base/components/gloabl-warming/global-warming-speedometer";


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
                        type="hero-heading"
                        fontweight="bold"

                    >
                        Gas Emission Around the World
                    </Text>
                </div>

                <div>

                    <D3GlobalWarmingChoroplethMap
                        type="map"
                        size={{ width: 1000, height: 500 }}
                    />

                    <div style={{
                        width:   800,
                        margin:  "auto",
                        padding: 30

                    }}>
                        <Text
                            type="sub-title"
                            textAlign="center">

                            Reducing your carbon footprint is important because it
                            mitigates the effects of global climate change, improves public health,
                            boosts the global economy, and maintains biodiversity. When we cut carbon emissions we help ensure cleaner air,
                            water, and food for our generation and for generations yet to come.</Text>

                    </div>

                </div>
                <Reveal>
                    <div className="ctn-heading">
                        <Text
                            type="hero-heading"
                            fontweight="bold" >
                            2019 Gas Emission
                        </Text>
                    </div>

                    <GlobalWarmingSpeedometer />
                </Reveal>

            </>
        );
    }
}

export default GlobalWarming;