import React from "react";
import Text from "@base/design/text";
import D3Circle from "../d3/d3-circle";
import { T_Gases_Emission, T_Sector } from "../d3/d3-force-network";
import {
    Button, Col, Row
} from "react-bootstrap";
import D3BarChart from "../d3/d3-barchart";

interface I_Props {
    netforcedata: T_Gases_Emission

    country: string
    selectedDataInfo: T_Sector[]
    yearList: string[]
    year: number
    onHoverArc: (key: string) => void
    onSelectedArc: (key: string) => void
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

    componentDidMount() {

        const params = (new URL(window.location.href)).searchParams;
        const year = params.get("year");

        const yearQuery = parseInt(year as string);

        this.setState({
            year: yearQuery
        });
    }

    render(): JSX.Element {

        const data = this.props.selectedDataInfo;

        return (
            <>
                <style jsx>{`
                    .ctn-tooltips{
                        border : 1px solid #000000;
                        top :0;
                        right:0;
                        z-index:20;
                        margin-right:10px;
                        background:#eee;
                        height:100%;
                        width :320px;
                        padding:20px;
                        position:absolute
                    }

                    .txt-header{
                        margin-bottom:30px;
                    }

              
                   #circle-tooltip{
                        position: relative;
                        margin:auto;
                        
                        background : rgba(0,0,0,0.4);
                    
                        color: #FFFFFF;
                        width : 300px;
                        text-align : center;
                   }

                    @media screen and (min-width: 1240px) {            
                        .ctn-tooltips{
                            right:200px;
                            width :400px;
                        }
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
                        onSelectedArc={this.props.onSelectedArc}
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
                                <div style={{
                                    textAlign: "right"
                                }}>
                                    <Button onClick={this.handleButtonOnClick}>
                                        Reset
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {
                            data.length > 0 &&
                            <D3BarChart
                                year={this.props.year}
                                sector={data[0]["name"]}
                                data={data[0]["gases"]} />
                        }


                    </div>

                </div>

            </>
        );
    }
    handleButtonOnClick = () => {
        this.props.onHoverArc("");
        this.props.onSelectedArc("");
    };

    handleDDLOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {

        const value = parseInt(e.target.value);



        this.setState({
            year: value
        }, () => this.props.handleOnChangeDDL(value));
    };
}

export default NetForceDiagramToolTips;