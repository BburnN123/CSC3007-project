import React from "react";
import Text from "@base/design/text";
import D3Circle from "../d3/d3-circle";
import { T_Gases_Emission, T_Sector } from "../d3/d3-force-network";
import {
    Button, Col, Row
} from "react-bootstrap";

interface I_Props {
    netforcedata: T_Gases_Emission

    country: string
    selectedDataInfo: T_Sector[]
    yearList: string[]
    year: number
    onHoverArc: (key: string) => void
    handleOnChangeDDL: (year: number) => void
}

interface I_State {
    year: number
}
class NetForceDiagramToolTips extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            year: this.props.year
        };
    }


    render(): JSX.Element {

        return (
            <>
                <style jsx>{`
                    .ctn-tooltips{
                        border : 1px solid #000000;
                        position:absolute;
                        top :0;
                        right:0;
                        z-index:20;
                        margin-right:10px;
                        background:#eee;
                        height:100%;
                        width :30%;
                        padding:20px;
                    }

                    .txt-header{
                        margin-bottom:30px;
                    }

                    .ddl-year{
                        margin-left:10px;
                    }
                `}</style>
                <div className="ctn-tooltips">


                    <div className="txt-header">
                        <Text
                            type="title"
                            fontweight="bold"
                            textAlign="center">
                            Overview of {this.props.country} Carbon Emission
                        </Text>
                    </div>

                    <D3Circle
                        country={this.props.country}
                        year={this.state.year}
                        gasemissiondata={this.props.netforcedata}
                        onHoverArc={this.props.onHoverArc}
                    />

                    <div className="txt-body">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <select
                                    className="ddl-year"
                                    value={this.state.year}
                                    onChange={this.handleDDLOnChange}
                                >
                                    {this.props.yearList.map((y) => (
                                        <option value={y} key={y}>{y}</option>
                                    ))}

                                </select>
                            </Col>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Button onClick={this.handleButtonOnClick}>
                                    Reset
                                </Button>
                            </Col>
                        </Row>




                        <Text
                            type="body"
                            fontweight="bold"
                            textAlign="left">
                            Gas
                        </Text>


                        <Text
                            type="body"
                            fontweight="bold"
                            textAlign="center">
                            Gases
                        </Text>

                        <Text
                            type="body"
                            fontweight="bold"
                            textAlign="center">
                            asd
                        </Text>



                        {/* {selectedDataInfo.length > 0 && selectedDataInfo.map(d => {

                        return (
                            <>
                                <Text
                                    type="body"
                                    fontweight="bold"
                                    textAlign="center">
                                    {d["name"]}
                                </Text>

                                <Row>
                                    <Col>
                                        <Text
                                            type="body"
                                            fontweight="bold"
                                            textAlign="center">
                                            {d["name"]}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text
                                            type="body"
                                            fontweight="bold"
                                            textAlign="center">
                                            {d["name"]}
                                        </Text>
                                    </Col>
                                </Row>


                            </>
                        );
                    })} */}
                    </div>

                </div>

            </>
        );
    }
    handleButtonOnClick = () => {
        this.props.onHoverArc("");
    };

    handleDDLOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {

        const value = parseInt(e.target.value);



        this.setState({
            year: value
        }, () => this.props.handleOnChangeDDL(value));
    };
}

export default NetForceDiagramToolTips;