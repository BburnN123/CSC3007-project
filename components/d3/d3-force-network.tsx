/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import axios from "axios";
import { T_Case, T_Link } from "@base/pages/milestone2/force-diagram";

/* COMPONENTS */

/* UTILS */

/* TYPES */
type T_Category = "gender" | "age" | "vaccinated"

interface I_Props {
    data_link: T_Link[]
    data_case: T_Case[]
}

interface I_State {
    categoryType: T_Category
    colorScale: { [key: string | number]: string | boolean }
    tooltipValue: T_Case | Record<string, unknown>
}


class D3ForceNetWork extends React.PureComponent<I_Props, I_State>{

    constructor(props: I_Props) {
        super(props);
        this.state = {
            categoryType: "gender",
            colorScale:   { "female": "#FF99CC", "male": "#3944BC" },
            tooltipValue: {
            }
        };

    }

    async componentDidMount() {
        this.drawCanvas();
    }

    render(): JSX.Element{
        return(
            <div id="ctn-force-network"></div>
        );
    }

    drawCanvas = () => {

        const width = 1200;
        const height = 800;

        const svg = d3.select("#ctn-force-network").select("svg");
        if (svg.size() > 0) {
            return;
        }

        if (svg.size() > 0) {
            return;
        }

        d3.select("#ctn-force-network").append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        /* Intialise the nodes */
        const data: T_Case[] & { x: number, y: number }[] = [];
        const { data_case } = this.props;
 
        data_case.map(d => {
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
        const { data_link } = this.props;

        const svg = d3.select("#ctn-force-network").select("svg");
        const width = 1200,
            height = 600;


        /* Add Link to the Data */
        const links: { source: number, target: number, date: string }[] = [];
        data_link.map(link => {
            const obj = {
                source: link.infector,
                target: link.infectee,
                date:   link.date
            };

            links.push(obj);
        });


        const linkpath = svg.append("g")
            .attr("id", "links")
            .selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("marker-end", (d: any) => "url(#arrow)")
            .attr("fill", "none")
            .attr("stroke", "black");



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

        // Create Circle
        const node = svg.append("g")
            .attr("id", "nodes")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 15)
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
            })

            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended) as any);


        function dragstarted(event: any, d: any) {

            // Restart the whole simulation again
            d3.select("#tooltip")
                .classed("opacity-remove", true);

            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: any, d: any) {

            // if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: any, d: any) {
            d3.select("#tooltip")
                .classed("opacity-remove", false);
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        svg.select("#nodes")
            .selectAll("circle")
            .style("fill", (d: any) => {

                return colorScale[d[categoryType]];
            });
    };


}

export default D3ForceNetWork;