/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import { Container } from "react-bootstrap";
import { legendColor } from "d3-svg-legend";
import { GasColorScale } from "@base/utils/colorscale";


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
    gasColorScale: { [key: string | number]: string | boolean }
    yearchosen: number
    sector: string
    country: string
    countryList: string[]
}

interface I_Props {
    country: string
}

class D3HorizontalBarChart extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);

        this.state = {

            // optional second annotation for better type inference
            gasColorScale: GasColorScale,
            yearchosen: 2018,
            width: 1000,
            height: 800,
            sector: "Total excluding LUCF",
            country: "Singapore",
            countryList: []
        };
    }
    async componentDidMount() {
        await this.getCountry();
        const data = await this.getData();
        this.drawLineChart();
    }

    render(): JSX.Element {
        const ddlOptions = ["Total including LUCF",
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
            "Other Fuel Combustion"];

        return (
            <>
                <style jsx global>{`
                    
                    .line-path{
                        fill:none;
                        stroke-width : 8px;
                    }
                `}</style>
                <style jsx>{`
                    #tooltip-horizontal-bar{
                        position: absolute;
                        text-align: center;
                        width: 150px;
                        height: 100px;
                        padding: 2px;
                        background: rgba(0,0,0,0.8);
                        color: #FFFFFF;
                        border-radius: 8px;
                        pointer-events: none;
                        opacity : 0;
                    }
                    
                    #ddl-sector{
                        margin-bottom:20px;
                        width: 300px;
                    }
                    #svg-line{
                        position:relative;
                        left:0; 
                        top:0;
                        width:100%;
                        height:100%
                    }
                    #ctn-line{
                        position:relative;
                        width:100%;
                        height:500px;
                    }
                `}</style>

                <Container fluid>
                    <select
                        value={this.state.country}
                        id="ddl-sector"
                        onChange={this.handleOnChangeDDLCountry}
                    >
                        {this.state.countryList.map(ddl => (
                            <option key={ddl} value={ddl}>{ddl}</option>
                        ))}

                    </select>

                    <select
                        value={this.state.sector}
                        id="ddl-sector"
                        onChange={this.handleOnChangeDDLSector}
                    >
                        {ddlOptions.map(ddl => (
                            <option key={ddl} value={ddl}>{ddl}</option>
                        ))}

                    </select>

                    <div id="ctn-line" ></div>
                    <div id="tooltip-horizontal-bar"></div>
                </Container>
            </>
        );
    }

    getCountry = async () => {

        const jsonData = await d3.json("../../assets/historical_emission.json") as T_Gases_Emission;
        const objCountry = Object.values(jsonData);
        const countryList = Object.keys(objCountry[0]);

        this.setState({
            countryList
        });
    };

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
            const country = this.state.country;

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

    drawLineChart = () => {

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

        // Create the X axis
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", "x-axis");

        // Create the Y axis       
        svg.append("g")
            .attr("id", "y-axis");


        this.updateLineGraph();
        this.addLegend();
    };

    updateLineGraph = async () => {

        const { gasColorScale, height: ctnHeight, width: ctnWidth } = this.state;

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
            .range([0, width]);

        const xAxis = d3.select("#x-axis") as any;

        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-8px")
            .attr("dy", "15px")
            .attr("transform", "rotate(-45)")
            .style("font-size", "18");

        /* Y AXIS */

        const y = d3.scaleLinear()
            .domain([0, d3.max(flatArrayGas, d => parseInt(d["value"])) as number])

            // .clamp(true)
            .range([height, 0]);

        const yAxis = d3.select("#y-axis") as any;

        yAxis.transition().duration(1000).call(d3.axisLeft(y)).style("font-size", "18");


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
                d3.select("#tooltip-horizontal-bar").transition()
                    .duration(50)
                    .style("opacity", 1);

                var xPosition = x.invert(d3.pointer((event))[0]);//xScale.invert(d3.mouse(this)[0]), //<-- give me the date at the x mouse position
                const date = new Date(xPosition);
                let year = date.getFullYear();

                const yearValue = d[1].filter((d: any) => d["year"] as any === year.toString()) as any;

                // const tipString = <></>year.toString() + " " + yearValue[0]["value"];
                const tipString = `Gas : ${d[0]} <br/> Year : ${year.toString()} <br/> Value : ${yearValue[0]["value"].toFixed(2)}`
                const posX = event.pageX + 10;
                const posY = event.pageY + 10;

                d3.select("#tooltip-horizontal-bar").html(tipString)
                    .style("left", (posX) + "px")
                    .style("top", (posY) + "px");
            })
            .on("mouseout", function (d, i) {

                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("opacity", "1");

                //Makes the new div disappear:
                d3.select("#tooltip-horizontal-bar")
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
                return gasColorScale[d[0]] as any;
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
    ) => {

        const { gasColorScale } = this.state;

        const ordinal = d3.scaleOrdinal()
            .domain(Object.keys(gasColorScale))
            .range(Object.values(gasColorScale));


        const legend = legendColor()
            .shapeWidth(30)
            .title("Gases")
            .scale(ordinal);


        d3.select("#ctn-line").select("#svg-line")
            .append("g")
            .attr("class", "bar-legend")
            .attr("transform", "translate(100,0)")
            .call(legend as any);
    };

    handleLegendXAxis = () => {
        return 100;
    };
    handleLegendYAxis = () => {
        return 200;
    };

    handleOnChangeDDLSector: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {

        // console.log(selectedGroup)
        const selectedValue = e.target.value;

        this.setState({
            sector: selectedValue
        }, this.updateLineGraph);
    };

    handleOnChangeDDLCountry: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {

        // console.log(selectedGroup)
        const selectedValue = e.target.value;
        console.log(selectedValue);

        this.setState({
            country: selectedValue
        }, this.updateLineGraph);
    };


}

export default D3HorizontalBarChart;