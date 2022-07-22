import React from "react";
import * as d3 from "d3";
import { Container } from "react-bootstrap";
import { T_Gases_Emission, T_Sector } from "@base/components/d3/d3-force-network";


interface I_Props {
    year: number
    country: string
    gasemissiondata: T_Gases_Emission
}

interface I_State {
    year: number
    country: string
    color: readonly string[]
}
class D3Circle extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            year:    0,
            country: "",
            color:   d3.schemeRdBu[11]
        };
    }

    async componentDidMount() {
        this.setState({
            year:    this.props.year,
            country: this.props.country
        });

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
                <style jsx>{`
                   #tooltip-circle{
                    position: relative;
             
                    background : rgba(0,0,0,0.4);
                 
                    color: #FFFFFF;
                    width : 200px;
                    text-align : center;
                   }

                   
                #svg-piechart, #svg-legend {
                    position:absolute;
                    left:0; 
                    top:0;
                    width:100%;
                    height:100%
                }

                #ctn-piechart, #legend-circle{
                    position:relative;
                    width:800px;
                    height:500px;
                  
                }
                `}</style>
                <Container>
                    <div id="tooltip-circle"></div>



                    <div id="ctn-piechart">
                        <svg id="svg-piechart"></svg>
                        <div id="legend-circle"></div>

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

        const data = countryData.map(d => {
            const percentage = (d["value"] / maxValue) * 100;
            return {
                label: d["name"],
                value: percentage.toFixed(1)
            };
        });

        return data;
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

        const ctnCircle = d3.select("#ctn-piechart").select("svg");

        const width = 800;
        const height = 600; //this is the double because are showing just the half of the pie

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

        //array of colors for the pie (in the same order as the dataset)
        const color = d3.scaleOrdinal()
            .range(this.state.color);

        const svg = d3.select("#ctn-piechart")
            .select("#first-g")
            .data([ data ]); //associate our data with the document;

        const arc = d3.arc() //this will create <path> elements for us using arc data
            .innerRadius(79)
            .outerRadius(radius);

        const pie = this.getPie();

        const arcs = svg.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie as any)
            .on("mouseover", (event, d: any) => {

                d3.select(event.currentTarget)
                    .classed("selected", true);


                d3.select("#tooltip-circle")
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .text(d.data["label"]);
            })
            .on("mouseout", (event, d) => {

                // d3.select(".tooltip")
                //     .text("");

                d3.select(event.currentTarget)
                    .classed("selected", false);
            })
            .enter()//associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .append("svg:g")
            .attr("class", "slice");

        arcs.append("svg:path")
            .attr("class", "arcs")
            .attr("fill", (d, i) => color(i.toString()) as string
            ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc as any);




        // arcs
        //     .enter()
        //     .append("text")
        //     .attr("text-anchor", "middle")

        //     /*
        //     .attr("x", function(d) {
        //       var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
        //       d.cx = Math.cos(a) * (radius - 75);
        //       return d.x = Math.cos(a) * (radius - 20);
        //     })
        //     .attr("y", function(d) {
        //       var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
        //       d.cy = Math.sin(a) * (radius - 75);
        //       return d.y = Math.sin(a) * (radius - 20);
        //     })
        //     */
        //     .attr("transform", function (d) {

        //         // const pos = arc.centroid(d);
        //         // pos[0] = radius * 0.95 * (midAngle(pie) < Math.PI ? 1 : -1);

        //         return "translate(" + pos + ")";
        //     })
        //     .text(function (d, i) {
        //         return `${data[i].value}%`;
        //     });


        // /* Create Class */
        const label = arcs
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
        const ctnCircle = d3.select("#legend-circle").select("svg").attr("id", "svg-legend");

        const width = 1000;
        const height = 300; //this is the double because are showing just the half of the pie

        if (ctnCircle.size() > 0 || data === null) {
            return;
        }

        console.log(ctnCircle);


        //array of colors for the pie (in the same order as the dataset)
        const color = d3.scaleOrdinal()
            .range(this.state.color);

        const svg = d3.select("#legend-circle")
            .append("svg") //create the SVG element inside the <body>
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")

            .attr("id", "svg-legend");

        const legend = svg.selectAll("g.legend") //this selects all <g> elements with class slice (there aren't any yet)
            .data(data)
            .enter()//associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .append("svg:g")
            .attr("class", "legend")
            .attr("transform", "translate(500,0)");

        // Add one dot in the legend for each name.
        const size = 20;
        legend
            .append("rect")
            .attr("x", 100)
            .attr("y", function (d, i) {
                return 100 + i * (size + 5);
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", (d, i): any => {
                return color(i as any);
            });

        // Add one dot in the legend for each name.
        legend
            .append("text")
            .attr("x", 100 + size * 1.2)
            .attr("y", function (d, i) {
                return 100 + i * (size + 5) + (size / 2);
            }) // 100 is where the first dot appears. 25 is the distance between dots

            .text(function (d) {

                return d["label"];
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
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


        arcs.enter()
            .append("svg:path")
            .attr("class", "arcs")
            .merge(arcs)
            .attr("fill", (d, i) => color(i.toString()) as string)
            .attr("d", arc as any);

        arcs
            .exit()
            .remove();

    };
}

export default D3Circle;