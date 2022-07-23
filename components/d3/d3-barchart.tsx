import React from "react";
import * as d3 from "d3";
import { T_Node } from "@base/components/d3/d3-force-network";

import Text from "@base/design/text";

interface I_Props {
    data: T_Node[]
    year: number
    sector: string
}

interface I_State {
    width: number
    height: number
    gasColorScale: { [key: string]: string }
    year: number
    sector: string
}

class D3BarChart extends React.PureComponent<I_Props, I_State>{

    constructor(props: I_Props) {
        super(props);
        this.state = {
            width:         1000,
            height:        700,
            gasColorScale: {
                "CO2":   "#F1FAEE",
                "CH4":   "#A8DADC",
                "N2O":   "#457B9D",
                "F-Gas": "#1D3557"
            },
            year:   this.props.year,
            sector: this.props.sector

        };
    }
    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        if (this.props.year !== this.state.year) {
            this.setState({
                year: this.props.year
            }, this.drawBarChart);
        }

        if (this.props.sector !== this.state.sector) {
            this.setState({
                sector: this.props.sector
            }, this.drawBarChart);
        }
    }

    render(): JSX.Element {

        return (
            <>
                <style jsx>{`
                      #ctn-barchart{
                        position:relative;
                        width:100%;
                        height:100%;
                        margin:auto;
                    }

                    #svg-bar{
                        position:absolute;
                        left:0; 
                        top:0;
                        width:500px;
                        height:300px
                    }
                  
                    `}</style>

                <Text >
                
                    {this.props.sector}
                </Text>
                <div id="ctn-barchart"></div>

            </>
        );
    }

    drawCanvas = () => {

        const { width, height } = this.state;

        const margin = { top: 20, right: 30, bottom: 40, left: 90 };

        const ctnMap = d3.select("#ctn-barchart").select("svg");
        if (ctnMap.size() > 0) {
            return;
        }

        const svg = d3.select("#ctn-barchart")
            .append("svg") //create the SVG element inside the <body>
            .attr("id", "svg-bar")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Create the X axis
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", "x-axis");

        // Create the Y axis       
        svg.append("g")
            .attr("id", "y-axis");

        this.drawBarChart();

    };

    drawBarChart = () => {

        const { data } = this.props;
        const { gasColorScale } = this.state;
        const svg = d3.select("#ctn-barchart").select("svg");

        const margin = { top: 20, right: 30, bottom: 40, left: 90 };

        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;


        const yLabel = data.map(d => d["name"]);
        const xLabel = data.map(d => d["value"]);

        // Add X axis
        const x = d3.scaleLinear()
            .domain([ 0, d3.max(xLabel) ] as any)
            .range([ 0, width ]);
            

        const xAxis = d3.select("#x-axis") as any;

        xAxis
            .transition()
            .duration(1000)
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(4))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "32");

        // Y axis
        const y = d3.scaleBand()
            .range([ 0, height ])
            .domain(yLabel)
            .padding(.1);

        const yAxis = d3.select("#y-axis") as any;

        yAxis.transition()
            .duration(1000)
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "32");

        // //Bars
        const rect = svg.selectAll("rect")
            .data(data);

        rect.enter()
            .append("rect")
            .merge(rect as any)
            .attr("x", x(0))
            .attr("y", (d) => {
                return y(d["name"]) as any;
            })
            .attr("width", (d) => {
                return x(d["value"]);
            })
            .attr("fill", (d) => {
                return gasColorScale[d["name"]];
            })
            .attr("height", y.bandwidth())
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        rect
            .exit()
            .remove();
    };

}

export default D3BarChart;