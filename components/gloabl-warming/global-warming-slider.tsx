import React from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

import Text from "@base/design/text";

interface I_Props {
    minYear: number
    maxYear: number
    handleOnSliderChange: (year: number) => void;
    handleOnPlay?: () => void;
}

interface I_State {
    value: number
    playActive: boolean
}
class GlobalWarmingSlider extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            value:      0,
            playActive: false
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.minYear
        });
    }

    render(): JSX.Element {

        const marks = this.getRCMarks();
        return (
            <>

                <style jsx>{`

                    .ctn-slider{
                        padding:10px;
                        margin:auto;
                        text-align:center;
                        margin-bottom:20px;
                    }

                    .slider::-webkit-slider-thumb,.slider::-moz-range-thumb {
                        width: 25px;
                        height: 25px;
                        background: #F44336;
                        cursor: pointer;
                      }

                    .ctn-txt-heading{
                        margin-bottom:10px;
                      }

                      body {
                        background-color: #666;	
                    }

                    .fa-play-circle, .fa-stop-circle{
                        font-size:40px;
                        color: #F44336;
                        cursor:pointer;
                    }
                 
                `}</style>

                <div className="ctn-slider">
                    <div className="ctn-txt-heading">
                        <Text fontweight="bold"
                            type="heading">
                            {this.state.value}
                        </Text>

                        {this.state.playActive ? (
                            <i className="fa fa-stop-circle" onClick={this.handleOnPlayStop}></i>
                        ) : (
                            <i className="fa fa-play-circle" onClick={this.handleOnPlay}></i>
                        )}


                    </div>


                    <Slider
                        min={this.props.minYear}
                        max={this.props.maxYear}
                        value={this.state.value}
                        onChange={this.handleOnChange}
                        marks={marks}
                        railStyle={{
                            height: 5
                        }}
                        handleStyle={{
                            height: 28,
                            width:  28,

                            marginTop:       -14,
                            backgroundColor: "#F44336",
                            border:          0
                        }}
                        trackStyle={{
                            background: "none"
                        }}
                        style={{
                            width:  800,
                            margin: "auto"
                        }}
                    />
                </div>
            </>
        );
    }

    handleOnChange = (value: number | number[]): void => {

        const sliderValue = value as number;
        this.setState({
            value: sliderValue
        }, () => this.props.handleOnSliderChange(sliderValue));
    };

    handleOnPlay = async () => {

        this.setState({
            playActive: true
        });

        this.iteratePlayLoop(0);
    };

    handleOnPlayStop = () => {
        this.setState({
            playActive: false
        });
    };

    iteratePlayLoop = async (i: number) => {
        const totalLength = this.props.maxYear - this.props.minYear + 1;

        await setTimeout(() => {
            const lblYear = this.props.minYear + i;

            this.setState({
                value: lblYear
            }, () => this.props.handleOnSliderChange(lblYear));

            if (i === totalLength || !this.state.playActive) {
                this.setState({
                    value: this.props.minYear
                }, () => this.props.handleOnSliderChange(this.props.minYear));
                return;
            }

            this.iteratePlayLoop(i + 1);
        }, 700);

    };

    getRCMarks = () => {
        const marks: any = {};

        const totalLength = this.props.maxYear - this.props.minYear;

        for (let i = 0; i < totalLength + 1; i++) {

            const lblYear: number = this.props.minYear + i;

            marks[lblYear] = {
                style: {
                    width: i,
                    color: "#FFF"
                },
                label: lblYear
            };
        }

        return marks;
    };
}

export default GlobalWarmingSlider;