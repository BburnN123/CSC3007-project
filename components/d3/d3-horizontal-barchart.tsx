/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import { Container } from "react-bootstrap";


type T_Gases_Emission = {
    [year: number]: {
        [country: string]: T_Sector[]
    }
}
type T_Gases = {
    name: string
    value: string
}

type T_Sector = {
    name: string
    value: number
    gases: T_Gases[]
}
type I_State = {
    width: number
    height: number
    color: any
    colorScale: { [key: string | number]: string | boolean }
    yearchosen: number
    sector: string
}

interface I_Props {
    country: string
}

class D3HorizontalBarChart extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);

        this.state = {

            // optional second annotation for better type inference
            color: d3.scaleOrdinal()
                .range([ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999" ]),
            yearchosen: 2019,
            width:      1000,
            height:     800,
            colorScale: {},
            sector:     "Waste"
        };
    }
    async componentDidMount() {
        const data = await this.getData();
        this.drawLineChart(data);
    }

    render(): JSX.Element {
        const ddlOptions = [ "Total including LUCF",
            "Total excluding LUCF",
            "Energy",
            "Electricity/Heat",
            "Transportation",
            "Manufacturing/Construction",
            "Agriculture",
            "Fugitive Emissions",
            "Building",
            "Industrial Processes",
            "Land-Use Change and Forestry",
            "Waste",
            "Bunker Fuels",
            "Other Fuel Combustion" ];

        return (
            <>
                <style jsx global>{`
                    
                    .line-path{
                        fill:none;
                        stroke-width : 8px;
                    }
                `}</style>
                <style jsx>{`
                    .tooltip{
                        position: absolute;
                        text-align: center;
                        width: 60px;
                        height: 50px;
                        padding: 2px;
                        background: rgba(0,0,0,0.8);
                        color: #FFFFFF;
                        border-radius: 8px;
                        pointer-events: none;
                        opacity : 0;
                    }
                    #ddl-sector{
                        margin-bottom:20px;
                    }
                    #svg-line{
                        position:absolute;
                        left:0; 
                        top:0;
                        width:100%;
                        height:100%
                    }
                    #ctn-line{
                        position:relative;
                        width:60%;
                        height:500px;
                    }
                `}</style>

                <Container>
                    <select
                        value={this.state.sector}
                        id="ddl-sector"
                        onChange={this.handleOnChangeDDL}
                    >
                        {ddlOptions.map(ddl => (
                            <option key={ddl} value={ddl}>{ddl}</option>
                        ))}

                    </select>

                    <div id="ctn-line" ></div>
                    <div className="tooltip">doog</div>
                </Container>
            </>
        );
    }

    getYear = async (): Promise<string[]> => {

        const jsonData = await d3.json("../../assets/historical_emission.json") as T_Gases_Emission;
        const years = Object.keys(jsonData);

        return years;
    };

    getData = async (): Promise<(T_Sector & { year: string })[]> => {

        const jsonData = await d3.json("/assets/historical_emission.json") as T_Gases_Emission;

        const years = Object.keys(jsonData);
        const data: (T_Sector & { year: string })[] = [];

        years.map(year => {

            // Change to integer year
            const parseYear = parseInt(year);
            const country = this.props.country;

            jsonData[parseYear][country].map(sector => {

                if (sector["name"] != this.state.sector) {
                    return;
                }

                const gases = sector["gases"].map(gas => {
                    return {
                        ...gas,
                        year
                    };
                });
                data.push({
                    ...sector,
                    gases,
                    year
                });
            });
        });

        return data;
    };

    drawLineChart = (data: (T_Sector & { year: string })[]) => {

        const lineChartSVG = d3.select("#ctn-line").select("#svg-line");

        // List of groups (here I have one group per column)

        //Need to select dont append and do the check to prevent the react from rendering the linechart twice 
        if (lineChartSVG.size() > 0) {
            return;
        }

        const { width: ctnWidth, height: ctnHeight } = this.state;

        // const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const margin = { top: 70, right: 30, bottom: 70, left: 60 };
        const height = ctnHeight - margin.top - margin.bottom;


        // append the svg object to the body of the page
        const svg = d3.select("#ctn-line").append("svg")
            .attr("id", "svg-line")
            .attr("viewBox", `0 0 ${ctnWidth} ${ctnHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const arrayGas = data.map((d) => {
            return d["gases"];
        });

        const flatArrayGas = arrayGas.flat();
        const groupDataByGas = d3.group(flatArrayGas, d => d["name"]); // nest function allows to group the calculation per level of a factor

        // Create the X axis
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", "x-axis");

        // Create the Y axis       
        svg.append("g")
            .attr("id", "y-axis");


        this.updateLineGraph();

        this.addLegend(groupDataByGas);
    };

    updateLineGraph = async () => {

        const { color, height: ctnHeight, width: ctnWidth } = this.state;

        // const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const margin = { top: 70, right: 30, bottom: 70, left: 60 };
        const width = ctnWidth - margin.left - margin.right;
        const height = ctnHeight - margin.top - margin.bottom;


        const svg = d3.select("#ctn-line").select("#svg-line");

        const data = await this.getData();
        const arrayGas = data.map((d) => {
            return d["gases"];
        });

        const flatArrayGas = arrayGas.flat();
        const groupDataByGas = d3.group(flatArrayGas, d => d["name"]); // nest function allows to group the calculation per level of a factor

        /* X Axis */

        const years = await this.getYear();

        const x = d3.scaleTime()
            .domain(d3.extent(years, d => d3.timeParse("%Y")(d)) as any)
            .range([ 0, width ]);

        const xAxis = d3.select("#x-axis") as any;

        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-8px")
            .attr("dy", "15px")
            .attr("transform", "rotate(-45)");

        /* Y AXIS */

        const y = d3.scaleLinear()
            .domain([ 0, d3.max(flatArrayGas, d => parseInt(d["value"])) as number ])
            .clamp(true)
            .range([ height, 0 ]);

        const yAxis = d3.select("#y-axis") as any;

        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        const line = svg.selectAll("path.line-path")
            .data(groupDataByGas);

        line
            .enter()
            .append("path")
            .attr("class", "line-path")
            .on("mouseover", function (event, d) {

                /* Line Graph */
                d3.select(this).transition()
                    .duration(50)
                    .attr("opacity", ".5");

                /* Makes the new div appear on hover */
                d3.select(".tooltip").transition()
                    .duration(50)
                    .style("opacity", 1);

                const tipString = d[0];
                d3.select(".tooltip").html(tipString)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px");
            })
            .on("mouseout", function (d, i) {

                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("opacity", "1");

                //Makes the new div disappear:
                d3.select(".tooltip")
                    .transition()
                    .duration(50)
                    .style("opacity", 0);
            })
            .merge(line as any)
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .transition() // Apply the changes
            .duration(1000)
            .attr("fill", "none")
            .attr("stroke", (d) => {
                return color(d[0]) as any;
            })
            .attr("d", (d) => {

                return d3.line()
                    .x(function (d: any) {
                        return x(d3.timeParse("%Y")(d["year"]) as any);
                    })
                    .y(function (d: any) {
                        return y(+d["value"]);
                    })(d[1] as any);
            });

        line
            .exit()
            .remove();

    };

    addLegend = (
        groupDataByGas: d3.InternMap<string, T_Gases[]>
    ) => {

        const { color } = this.state;

        const svg = d3.select("#ctn-line").select("#svg-line")
            .append("g")
            .attr("class", "legend");

        // Add the Legend
        // Add one dot in the legend for each name.

        svg.selectAll("mydots")
            .data(groupDataByGas.keys())
            .enter()
            .append("circle")
            .attr("cx", (d, i) => {
                return this.handleLegendXAxis();
            })
            .attr("cy", (d, i) => {
                return this.handleLegendYAxis();

            }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", (d) => {
                return color(d);
            });

        // Add one dot in the legend for each name.
        const tempvar = 0;
        svg.selectAll("mylabels")
            .data(groupDataByGas.keys())
            .enter()
            .append("text")
            .attr("x", (d, i) => {
                return this.handleLegendXAxis() + 10;
            }) // Distance from dot
            .attr("y", (d, i) => {
                return this.handleLegendYAxis() + 1;
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", (d) => {
                return color(d);
            })
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "10px");
    };

    handleLegendXAxis = () => {
        return 100;
    };
    handleLegendYAxis = () => {
        return 200;
    };

    handleOnChangeDDL: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {

        // console.log(selectedGroup)
        const selectedValue = e.target.value;

        this.setState({
            sector: selectedValue
        }, this.updateLineGraph);
    };


}

export default D3HorizontalBarChart;