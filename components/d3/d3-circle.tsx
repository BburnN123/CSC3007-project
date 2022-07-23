import React from "react";
import * as d3 from "d3";
import { Container } from "react-bootstrap";
import { T_Gases_Emission, T_Sector } from "@base/components/d3/d3-force-network";
import { legendColor } from "d3-svg-legend";


interface I_Props {
    year: number
    country: string
    gasemissiondata: T_Gases_Emission
    onHoverArc: (label: string) => void
    onSelectedArc: (label: string) => void
}

interface I_State {
    width: number,
    height: number,
    year: number
    country: string
    colorScale: { [key: string]: string },
    color: readonly string[]
    excludeSector: string[]
}
class D3Circle extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            width:         400,
            height:        400,
            year:          0,
            country:       "",
            colorScale:    {},
            color:         d3.schemeGreys[9],
            excludeSector: [ "Total including LUCF", "Total excluding LUCF" ]

        };
    }

    async componentDidMount() {
        this.setState({
            year:    this.props.year,
            country: this.props.country
        });

        this.createColorScale();
        await this.createCircle();
    }

    async componentDidUpdate() {
        if (this.props.year !== this.state.year) {
            this.setState({
                year: this.props.year
            });
            this.reBuildCircle();

        }

        if (this.props.country !== this.state.country) {
            this.setState({
                country: this.props.country
            });
            this.reBuildCircle();

        }
    }

    render(): JSX.Element {

        return (
            <>
                <style jsx global>{`
                    .slice.selected{
                        stroke-width:2px;
                        stroke:black;
                    }
                    .slice{
                        stroke-width:1px;
                        stroke:black;
                    }
                `}</style>
                <style jsx>{`
                //    #tooltip-circle{
                //     position: relative;
             
                //     background : rgba(0,0,0,0.4);
                 
                //     color: #FFFFFF;
                //     width : 200px;
                //     text-align : center;
                //    }

                   #circle-tooltip{
                        position: relative;
                        margin:auto;
                        
                        background : rgba(0,0,0,0.4);
                    
                        color: #FFFFFF;
                        width : 300px;
                        text-align : center;
                   }

                   .ctn-tooltip{
                        margin : 20px 0px;
                   }

                   
                #svg-piechart,  #svg-legend {
                    position:relative;
                    left:0; 
                    top:0;
                    width:100%;
                    height:100%
                }

                #svg-legend{
                    position:absolute;
                    // left:350px; 
                    top:0;
                    width:100%;
                    height:100%
                }

                #ctn-piechart{
                    position:relative;
                    width:100%;
                    height:300px;
                    margin:auto;
                }

                `}</style>
                <Container>

                    <div id="ctn-piechart">
                        <svg id="svg-piechart"></svg>


                    </div>
                    <div className="ctn-tooltip">

                        <div id="circle-tooltip">
                            Please click and hover on the slices

                        </div>
                    </div>
                </Container>

            </>
        );
    }

    getData = async (): Promise<{
        label: string,
        value: string
    }[] | null> => {

        const { gasemissiondata } = this.props;
        const countryData = gasemissiondata[this.props.year][this.props.country];

        if (countryData === undefined) {
            return null;
        }

        const maxValue = countryData.reduce((previousValue: number, currentValue: T_Sector) =>
            previousValue + currentValue["value"], 0
        );

        const dataValue: { label: string, value: string }[] = [];
        countryData.map(d => {
            if (this.state.excludeSector.includes(d["name"])) {
                return;
            }

            const percentage = (d["value"] / maxValue) * 100;
            dataValue.push({
                label: d["name"],
                value: percentage.toFixed(1)
            });
        });

        return dataValue;
    };

    getPie = () => {
        const pie = d3.pie() //this will create arc data for us given a list of values
            .startAngle(-90 * (Math.PI))
            .endAngle(90 * (Math.PI))
            .padAngle(.02) // some space between slices
            .sort(null) //No! we don't want to order it by size
            .value((d: any) => d.value); //we must tell it out to access the value of each element in our data array

        return pie;
    };


    createCircle = async () => {

        const { width, height } = this.state;
        const data = await this.getData();
        if (data === null) {
            return;
        }

        d3.select("#ctn-piechart")
            .select("svg") //create the SVG element inside the <body>
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("svg:g") //make a group to hold our pie chart
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")//move the center of the pie chart from 0, 0 to radius, radius

            .attr("id", "first-g");

        this.createArc(data);
        this.buildLegend(data);

    };

    createArc = (data: {
        label: string;
        value: string;
    }[]) => {


        const width = 1000;
        const height = 300; //this is the double because are showing just the half of the pie
        const radius = Math.min(width, height) / 2;
        const labelr = radius + 30; // radius for label anchor


        const { colorScale } = this.state;

        const svg = d3.select("#ctn-piechart")
            .select("#first-g")
            .data([ data ]); //associate our data with the document;

        const arc = d3.arc() //this will create <path> elements for us using arc data
            .innerRadius(79)
            .outerRadius(radius);

        const pie = this.getPie();

        const arcs = svg.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie as any)
            .on("click", (event, d: any) => {

                d3.select(event.currentTarget)
                    .classed("selected", true);

                d3.selectAll(".slice:not(.selected)")
                    .classed("fade-inactive", true);

                this.props.onSelectedArc(d.data["label"]);
            })
            .on("mouseover", (event, d: any) => {


                d3.select(event.currentTarget)
                    .classed("selected", true);

                d3.selectAll(".slice:not(.selected)")
                    .classed("fade-inactive", true);


                // Display the tooltips
                d3.select("#circle-tooltip")
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .text(d["data"]["label"] + " " +d["data"]["value"] + "MtCO");


                // this.props.onHoverArc(d.data["label"]);
                this.props.onHoverArc(d.data["label"]);


            })
            .on("mouseout", (event, d: any) => {

                d3.select(event.currentTarget)
                    .classed("selected", false);

                d3.selectAll(".slice")
                    .classed("fade-inactive", false);

                d3.select("#circle-tooltip")
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .text("Please hover and click on the slices");

                this.props.onHoverArc("");
            })
            .enter()//associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .append("svg:g")
            .attr("class", "slice");

        arcs.append("svg:path")
            .attr("class", "arcs")
            .attr("cursor", "pointer")
            .attr("fill", (d: any) => colorScale[d["data"]["label"]] as string) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc as any);

        // /* Create Class */
        const label = arcs
            .append("svg:text")
            .attr("class", "labels") //add a label to each slice
            .attr("fill", "grey")
            .attr("transform", (d: any) => {
                const c = arc.centroid(d),
                    xp = c[0],
                    yp = c[1],

                    // pythagorean theorem for hypotenuse
                    hp = Math.sqrt(xp * xp + yp * yp);
                return "translate(" + (xp / hp * labelr) + "," +
                    (yp / hp * labelr) + ")";
            })
            .attr("text-anchor", "middle"); //center the text on it's origin

        label
            .append("tspan")
            .attr("class", "lblTxt")
            .text(function (d, i) {
                return `${data[i].value}%`;
            })
            .attr("x", "0")
            .attr("dy", "1.2em");
    };

    buildLegend = async (data: {
        label: string;
        value: string;
    }[]) => {

        const labels = data.map((d) => d["label"]);
        const svg = d3.select("#legend-circle").select("#svg-legend");

        const colorScale = d3
            .scaleOrdinal()
            .domain(labels)
            .range(this.state.color);

        const legend = legendColor()
            .title("Sector Type")
            .scale(colorScale);

        svg.append("g")
            .attr("id", "legend-circle")
            .attr("transform", "translate(30,30)");

        svg.select("#legend-circle")
            .call(legend as any);


    };

    reBuildCircle = async () => {


        const data = await this.getData();


        if (data === null) {
            return;
        }
        const width = 1000;
        const height = 300; //this is the double because are showing just the half of the pie
        const radius = Math.min(width, height) / 2;
        const labelr = radius + 30; // radius for label anchor

        const color = d3.scaleOrdinal()
            .range(this.state.color);


        /* Get the SVG */
        const svg = d3.select("#ctn-piechart")
            .select("#first-g")
            .data([ data ]); //associate our data with the document;

        const pie = this.getPie();

        const arc = d3.arc()
            .innerRadius(79)
            .outerRadius(radius);

        const arcs = svg.selectAll("path")
            .data(pie as any);

        arcs
            .enter()
            .append("svg:path")
            .attr("class", "arcs")
            .merge(arcs)
            .transition()
            .duration(700)
            .attr("fill", (d, i) => color(i.toString()) as string)
            .attr("d", arc as any);

        const label = svg.selectAll("tspan.lblTxt")
            .data(pie as any);

        const text = svg.selectAll("text.labels")
            .data(pie as any);

        text
            .enter()
            .append("svg:text")
            .merge(text)
            .attr("class", "labels") //add a label to each slice
            .attr("fill", "grey")
            .attr("transform", function (d: any) {
                const c = arc.centroid(d),
                    xp = c[0],
                    yp = c[1],

                    // pythagorean theorem for hypotenuse
                    hp = Math.sqrt(xp * xp + yp * yp);
                return "translate(" + (xp / hp * labelr) + "," +
                    (yp / hp * labelr) + ")";
            })
            .attr("text-anchor", "middle");

        label
            .enter()
            .append("svg:text")
            .attr("class", "labels") //add a label to each slice
            .attr("fill", "grey")
            .attr("transform", function (d: any) {
                const c = arc.centroid(d),
                    xp = c[0],
                    yp = c[1],

                    // pythagorean theorem for hypotenuse
                    hp = Math.sqrt(xp * xp + yp * yp);
                return "translate(" + (xp / hp * labelr) + "," +
                    (yp / hp * labelr) + ")";
            })
            .attr("text-anchor", "middle")
            .merge(label)
            .text(function (d, i) {
                return `${data[i].value}%`;
            })
            .attr("x", "0")
            .attr("dy", "1.2em");

        arcs
            .exit()
            .remove();

        label
            .exit()
            .remove();

        text
            .exit()
            .remove();


    };

    createColorScale = async () => {

        const sectorType = [
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
            "Other Fuel Combustion"
        ].sort();

        const colorScale: { [key: string]: string } = {};

        const color = d3.scaleOrdinal()
            .range(this.state.color);

        sectorType.map((key, index) => {
            colorScale[key] = color(index.toString()) as string;
        });

        this.setState({
            colorScale
        });
    };
}

export default D3Circle;