/* NODE MODULES */
import React, { useState } from "react";
import * as d3 from "d3";
import { T_Case, T_Link } from "@base/pages/milestone2/force-diagram";
import Form from 'react-bootstrap/Form'
import { timeThursdays } from "d3";
/* COMPONENTS */

/* UTILS */

/* TYPES */
type T_Category = "gender" | "age" | "vaccinated"

interface I_Props {
    data_link: T_Link[]
    data_case: T_Case[]
}

interface I_State {
    width: number
    height: number
    categoryType: T_Category
    colorScale: { [key: string | number]: string | boolean }
    tooltipValue: T_Case | Record<string, unknown>
    yearchosen: number
}


class D3ForceNetWork extends React.PureComponent<I_Props, I_State>{

    constructor(props: I_Props) {
        super(props);
        this.state = {
            width: 1000,
            height: 800,
            categoryType: "gender",
            colorScale: { "female": "#FF99CC", "male": "#3944BC" },
            tooltipValue: {
            },

            yearchosen: 1990
        };

    }

    async componentDidMount() {

        const year = 2019;
        const country = "Afghanistan";
        const jsonData = await d3.json("/assets/test.json");
        const data = jsonData[year][country] as string[]
        console.log(data)


        data.map((d, i) => {

            console.log(i)
            const source = d["sector"]
            const source_value = d["value"]

            const gases = d["gases"]
            gases.map(g => {
                const target = g["name"]
                const target_value = g["value"]
                // console.log(target)
                // console.log(target_value)

            })


        })
        this.drawCanvas();
    }

    render(): JSX.Element {
        return (
            <div>
                <div id="ctn-force-network">
                </div>
                <Form.Label>Range</Form.Label>
                <Form.Range min={1990} max={2018} onChange={event => this.handleChange(event)} />
            </div>
        );
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { yearchosen } = this.state
        //console.log(e.target.value)
        this.setState({ yearchosen: e.target.value })
        console.log("in handlechange function" + yearchosen)
        //this.drawCanvas()
        //handle node change here
    }

    drawCanvas = () => {
        const { width, height, yearchosen } = this.state;
        const svg = d3.select("#ctn-force-network").select("svg");
        if (svg.size() > 0) {
            return;
        }
        d3.select("#ctn-force-network").append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        /* Intialise the nodes */
        const data: T_Case[] & { x: number, y: number }[] = [];
        const { data_case } = this.props;
        var jsonKey = "year" + yearchosen
        var data_case_json = data_case[jsonKey]
        console.log(data_case_json)
        data_case_json.content.map(d => {
            const obj = {

                // To Start from the center
                ...d,
                x: width / 2,
                y: height / 2
            };

            data.push(obj);
        });

        // Define the arrowhead marker variables
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 22)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        this.buildNetWorkNode(data);
    };

    buildNetWorkNode = (data: T_Case[] & { x: number, y: number }[]) => {

        const { colorScale, categoryType } = this.state;

        const svg = d3.select("#ctn-force-network").select("svg");

        const node = this.addCircles(data);
        const links = this.addLink();
        const linkpath = this.addLinkPaths(links);
        const simulation = this.addSimulation(node, links, linkpath, data);

        this.addDragEvent(node, simulation);




        svg.select("#nodes")
            .selectAll("circle")
            .style("fill", (d: any) => {

                return colorScale[d[categoryType]];
            });
    };


    addCircles = (data: T_Case[] & { x: number, y: number }[]): d3.Selection<SVGCircleElement, {
        x: number;
        y: number;
    }, SVGGElement, unknown> => {

        const { colorScale, categoryType } = this.state;

        const svg = d3.select("#ctn-force-network").select("svg");

        // Create Circle
        // Section to change radius of circle size
        const nodes = svg.append("g")
            .attr("id", "nodes")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function (d) {
                return 15
            })
            .style("fill", (d: any) => colorScale[d[categoryType]])
            .on("mouseover", (event, d) => {

                d3.select(event.currentTarget)
                    .attr("stroke", "black")
                    .attr("stroke-width", 2);

                // Display the tooltips
                d3.select("#tooltip")
                    .transition()
                    .duration(200)
                    .style("opacity", 1);

                this.setState({
                    tooltipValue: d
                });
            })
            .on("mouseout", (event, i) => {
                d3.select(event.currentTarget)
                    .attr("stroke", "none");

                // Hide the tooltips
                d3.select("#tooltip")
                    .transition()
                    .duration(200)
                    .style("opacity", 0);

                setTimeout(() => {
                    this.setState({
                        tooltipValue: {}
                    });
                }, 100);

            })
            .on("mousemove", function (event, d) {

                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            });

        return nodes;
    };

    addDragEvent = (node: d3.Selection<SVGCircleElement, {
        x: number;
        y: number;
    }, SVGGElement, unknown>,
        simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>
    ) => {
        node.call(d3.drag()
            .on("start", (event, d) => this.dragstarted(event, d, simulation))
            .on("drag", (event, d) => this.dragged(event, d, simulation))
            .on("end", (event, d) => this.dragended(event, d, simulation)) as any);
    };

    addLink = (): {
        source: number;
        target: number;
        date: string;
    }[] => {

        /**
         * Source - The starting point of the node
         * Target - Link to who
         */
        const { data_link } = this.props;

        /* Add Link to the Data */
        const links: { source: number, target: number, date: string }[] = [];
        data_link.map(link => {
            const obj = {
                source: link.infector,
                target: link.infectee,
                date: link.date
            };

            links.push(obj);
        });


        return links;
    };


    addLinkPaths = (links: {
        source: number;
        target: number;
        date: string;
    }[]): d3.Selection<SVGPathElement, {
        source: number;
        target: number;
        date: string;
    }, SVGGElement, unknown> => {

        const svg = d3.select("#ctn-force-network").select("svg");

        /* Add Link to the Data */
        const linkPath = svg.append("g")
            .attr("id", "links")
            .selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("marker-end", (_) => "url(#arrow)")
            .attr("fill", "none")
            .attr("stroke", "black");

        return linkPath;
    };

    addSimulation = (
        node: d3.Selection<SVGCircleElement, {
            x: number;
            y: number;
        }, SVGGElement, unknown>,
        links: {
            source: number;
            target: number;
            date: string;
        }[],
        linkpath: d3.Selection<SVGPathElement, {
            source: number;
            target: number;
            date: string;
        }, SVGGElement, unknown>,
        data: any
    ) => {


        const { width, height } = this.state;

        const simulation = d3.forceSimulation()
            .nodes(data)

            // .force("x", d3.forceX().strength(0.1).x(d => xPosition(d.class)))
            .force("x", d3.forceX().strength(0.5).x(width / 2))
            .force("y", d3.forceY().strength(0.1).y(height / 2))
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(50).strength(0.5))
            .force("charge", d3.forceManyBody().strength(-30))
            .force("collide", d3.forceCollide().strength(0.1).radius(40))
            .on("tick", () => {
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);

                linkpath
                    .attr("d", (d: any) => {
                        const dx = d.target.x - d.source.x,
                            dy = d.target.y - d.source.y,
                            dr = Math.sqrt(dx * dx + dy * dy);
                        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;

                        // return "M" + d.source.x + "," + d.source.y + " " + d.target.x + "," + d.target.y
                    });

            });

        return simulation;
    };

    dragstarted = (event: any, d: any, simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {


        // Restart the whole simulation again
        d3.select("#tooltip")
            .classed("opacity-remove", true);

        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    dragged = (event: any, d: any, simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {

        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = event.x;
        d.fy = event.y;
    };

    dragended = (event: any, d: any, simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {
        d3.select("#tooltip")
            .classed("opacity-remove", false);

        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };


}

export default D3ForceNetWork;