import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Text from "@base/design/text";
import * as d3 from "d3";

interface I_Props {
    value: number
    header?: string | React.ReactNode
}

class D3Speedometer extends React.PureComponent<I_Props> {

    render(): JSX.Element {
        const value = parseInt(this.props.value.toFixed(1)) || 0;

        const ColStyle = {
            display:        "flex",
            justifyContent: "center",

        };

        return (
            <>
                <style global jsx>{`
                    text.current-value{
                        font-size: 100px;
                    }
                `}</style>


                <div>

                    {this.props.header && (
                        <Text
                            fontweight="bold"
                            textAlign="center"
                            justify="center"
                            type="sub-title"
                        >
                            {this.props.header}
                        </Text>
                    )}

                </div>
                <div style={ColStyle}>
                    <ReactSpeedometer
                        needleTransition={"easeBounceOut" as any}
                        height={200}
                        maxValue={100}
                        value={value}
                        needleColor="red"
                        startColor="green"
                        segments={1000}
                        maxSegmentLabels={5}
                        endColor="red"
                        needleTransitionDuration={2000}
                        currentValueText={value ? value.toString() + "%" : ""}
                    />
                </div>

            </>
        );
    }
}

export default D3Speedometer;