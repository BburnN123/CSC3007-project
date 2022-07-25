import * as d3 from "d3";
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";
import { T_Gases_Emission } from "../d3/d3-force-network";
import D3Speedometer from "../d3/d3-speedometer";



interface I_State {
    totalValue: number
    gasesValue: { [key: string]: number }
}
class GlobalWarmingSpeedometer extends React.PureComponent<unknown, I_State> {

    constructor(props: unknown) {
        super(props);
        this.state = {
            totalValue: 0,
            gasesValue: {}
        };
    }

    async componentDidMount() {
        await this.getTotalGasValue();
    }

    render(): JSX.Element {

        // "CO2"
        // "CH4"
        // "N2O"
        // "F-Gas"
        const coValue = this.getGasValueInPercentage("CO2");
        const ch4Value = this.getGasValueInPercentage("CH4");
        const n20Value = this.getGasValueInPercentage("N2O");

        return (
            <>
                <Container fluid>
                    <Row className="align-items-center justify-content-center">
                        <Col>
                            <D3Speedometer
                                value={coValue}
                                header={<>CO<sub>2</sub></>}
                            />
                        </Col>
                        <Col >
                            <D3Speedometer
                                value={ch4Value}
                                header={<>CH<sub>4</sub></>} />

                        </Col>
                        <Col>
                            <D3Speedometer
                                value={n20Value}
                                header={<>N<sub>2</sub>O</>}
                            />
                        </Col>
                    </Row>

                </Container>

            </>
        );
    }

    getGasValueInPercentage = (gas: string) => {
        const { gasesValue, totalValue } = this.state;
        const gasPercentageValue = gasesValue[gas] / totalValue * 100;



        return gasPercentageValue;
    };

    getTotalGasValue = async () => {
        const data = await d3.json("../../assets/historical_emission.json") as T_Gases_Emission;

        const gasesValue: { [name: string]: number } = {};

        Object.keys(data[2019]).map(country => {

            data[2019][country].map(value => {

                const gases = value["gases"];
                if (gases.length < 1) {
                    return;
                }

                gases.map(g => {
                    const gasName = g["name"];
                    const gasValue = g["value"];

                    if (!(gasName in gasesValue)) {
                        gasesValue[gasName] = gasValue;
                        return;
                    }

                    gasesValue[gasName] = gasesValue[gasName] + gasValue;
                });
            });
        });

        let totalValue = 0;
        Object.keys(gasesValue).map(g => {
            totalValue = totalValue + gasesValue[g];
        });

        this.setState({
            totalValue,
            gasesValue
        });

    };
}

export default GlobalWarmingSpeedometer;