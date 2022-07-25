/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Text from "@base/design/text";
import D3GlobalWarmingChoroplethMap from "@base/components/d3/d3-global-warming-choropleth-map";
import D3HorizontalBarChart from "@base/components/d3/d3-horizontal-barchart";
import Reveal from "@base/design/reveal";
import GlobalWarmingSpeedometer from "@base/components/gloabl-warming/global-warming-speedometer";
import {
    Row, Col, Container
} from "react-bootstrap";
import { T_Gases_Emission } from "@base/components/d3/d3-force-network";
import * as d3 from "d3";

interface I_State {
    emissionDataset: T_Gases_Emission
}
class GlobalWarming extends React.PureComponent<unknown, I_State> {

    constructor(props: unknown) {
        super(props);
        this.state = {
            emissionDataset: []
        };

    }

    async componentDidMount() {
        const emissionDataset = await d3.json("./../assets/historical_emission.json") as T_Gases_Emission;
        this.setState({
            emissionDataset
        });
    }

    render(): JSX.Element {

        if (Object.keys(this.state.emissionDataset).length === 0) {
            return (
                <>
                    <div>
                        Processing
                    </div>
                </>
            );
        }
        return (
            <>
                <Container>
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

                        <div>
                            <Text
                                type="sub-heading"
                                textAlign="center">

                                Reducing your carbon footprint is important because it
                                mitigates the effects of global climate change, improves public health,
                                boosts the global economy, and maintains biodiversity. When we cut carbon emissions we help ensure cleaner air,
                                water, and food for our generation and for generations yet to come.</Text>

                        </div>

                    </div>


                    <br />

                    <Reveal>
                        <div className="ctn-heading">
                            <Text
                                type="hero-heading"
                                fontweight="bold" >
                                Greenhouse gas composition in 2013
                            </Text>
                        </div>
                        {this.state.emissionDataset && (
                            <GlobalWarmingSpeedometer emissionData={this.state.emissionDataset} />
                        )}
                        <Text
                            type="sub-heading"
                            textAlign="center"
                        >
                            The speedometer shows the 4 GHG (CO<sub>2</sub>, N<sub>2</sub>O, NH<sub>4</sub>, F-Gas ) that was emitted on 2018. Through this visualisation,
                            it shows which gases is the main contributor to the GHG emission.
                        </Text>

                    </Reveal>


                    <div className="ctn-heading">
                        <Text
                            type="hero-heading"
                            fontweight="bold" >
                            General trend for different gases
                        </Text>
                    </div>

                    <Row>
                        <Col>
                            {this.state.emissionDataset && (
                                <D3HorizontalBarChart
                                    emissionData={this.state.emissionDataset} />
                            )}

                        </Col>
                        <Col>
                            <div style={{
                                height:  "100%",
                                display: "flex",

                                alignItems: "center"
                            }}>
                                <Text
                                    type="sub-heading"

                                >
                                    Greenhouse gases emission has increase significantly, the line chart
                                    presents the general trend of the different gases over the periods from the 1990s to 2018s
                                    <br />
                                    <br />
                                    The lines on the graph represent the gases emission (CO<sub>2</sub>, N<sub>2</sub>O, NH<sub>4</sub>, F-Gas ) in each sector
                                </Text>

                            </div>


                        </Col>
                    </Row>

                    <br />

                </Container>
            </>
        );
    }

}

export default GlobalWarming;