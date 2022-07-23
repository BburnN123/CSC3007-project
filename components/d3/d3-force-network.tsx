/* NODE MODULES */
import React from "react";
import * as d3 from "d3";

/* COMPONENTS */

/* UTILS */

/* TYPES */

export type T_Gases_Emission = {
    [year: number]: {
        [country: string]: T_Sector[]
    }
}

type T_Node = {
    id: number
    name: string
    value: number
}

export type T_Sector = T_Node & {
    gases: T_Node[]
}

export type T_Gases_Link = {
    [year: number]: {
        [country: string]: T_Link[]
    }
}

type T_Link = {
    sector: number
    gas: number
    value: number;
}

interface I_Props {
    country: string,
    year: number,
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
    selectedNetForce: string
}

interface I_State {
    width: number
    height: number
    tooltipValue: T_Node | Record<string, unknown>,
    gasColorScale: Record<string, unknown>,
    sectorColorScale: Record<string, unknown>,
    sectorColor: any
    selectedNetForce: string
}


class D3ForceNetWork extends React.PureComponent<I_Props, I_State>{

    constructor(props: I_Props) {
        super(props);
        this.state = {
            width:         600,
            height:        700,
            gasColorScale: {
                "CO2":   "#F1FAEE",
                "CH4":   "#A8DADC",
                "N2O":   "#457B9D",
                "F-Gas": "#1D3557"
            },
            sectorColor:      d3.schemeRdBu[9],
            sectorColorScale: {},
            tooltipValue:     {
            },
            selectedNetForce: ""
        };

    }

    async componentDidMount() {
        await this.createColorScale();
        const data = await this.getNodeData();

        await this.drawCanvas(data);
    }

    async componentDidUpdate() {
        if (this.props.selectedNetForce !== this.state.selectedNetForce) {

            this.setState({
                selectedNetForce: this.props.selectedNetForce
            });

            if (this.props.selectedNetForce.trim() === "") {
                d3.selectAll("circle")
                    .classed("fade-inactive", false);
                return;
            }

            let name = this.props.selectedNetForce;
            name = name.replace(/[^a-zA-Z]+/g, "-").toLowerCase();

            d3.selectAll(`circle:not(.${name})`)
                .classed("fade-inactive", true);

            d3.selectAll(`circle.${name}`)
                .classed("fade-active", true);

        }
    }

    render(): JSX.Element {

        return (

            <>
                <style global jsx>{`
                   
                `}</style>

                <style jsx>{`     
                          #svg-force-network, #svg-legend {
                            position:relative;  
                            left:0; 
                            top:0;
                            width:100%;
                            height:100%
                        }
        
                        #ctn-force-network, #legend-circle{
                            position:relative;
                            width:${this.state.width}px;
                            height:${this.state.height}px;
                            border : 1px solid black;
                          
                        }
                        .fade-inactive {
                            z-index:-1;
                            opacity : 0.2;
                        }
                        .fade-active {
                            stroke-width: 4px;
                           
                        }

                        `}</style>

                <div id="ctn-force-network">
                </div>
            </>
        );
    }

    getNodeData = async () => {
        const { year, country } = this.props;

        const networkData = this.props.netforcedata;
        const data = networkData[year][country];

        const dataForceNetWork = data.map((d, i) => {

            // Convert to percentage
            const total_ghg = d["value"];

            const gases = d["gases"].map((g, i) => {

                /* Count how much percentage it hold */
                const percentage = (g["value"] / total_ghg) * 100;
                return {
                    id:     g["id"],
                    name:   g["name"],
                    value:  percentage,
                    type:   "gases",
                    sector: d["name"]

                };
            });

            gases.push({
                id:     d["id"],
                name:   d["name"],
                value:  100,
                type:   "sector",
                sector: d["name"]

            });

            return gases;

        });

        const flattenData = dataForceNetWork.flat();
        return flattenData;
    };

    getLinkData = async (): Promise<T_Link[]> => {

        const { year, country, netforcelink } = this.props;
        const data = netforcelink[year][country] as T_Link[];

        return data;
    };


    drawCanvas = async (dataForceNetWork: {
        id: number;
        name: string;
        value: number;
        type: string;
    }[]) => {

        const { width, height } = this.state;

        const svg = d3.select("#ctn-force-network").select("svg");
        if (svg.size() > 0) {
            return;
        }

        const zoom = d3.zoom()
            .scaleExtent([ 1, 3 ])
            .translateExtent([ [ 0, 0 ], [ width + 500, height + 500 ] ])
            .on("zoom", (e) => {
                d3.selectAll("#svg-network-force g")
                    .attr("transform", e.transform);
            });

        d3.select("#ctn-force-network").append("svg")
            .attr("id", "svg-network-force")
            .attr("viewBox", `0 0 ${width + 500} ${height + 500} `)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .call(zoom as any);

        /* Intialise the nodes */
        const data: (T_Node & { x: number, y: number })[] = [];
        dataForceNetWork.map(d => {
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

        await this.buildNetWorkNode(data);
    };

    buildNetWorkNode = async (data: (T_Node & { x: number, y: number })[]) => {

        const node = this.addCircles(data);
        const links = await this.addLink();
        const linkpath = this.addLinkPaths(links);
        const simulation = this.addSimulation(node, links, linkpath, data);

        this.addDragEvent(node, simulation);

    };

    addCircles = (data: (T_Node & { x: number, y: number })[]): d3.Selection<SVGCircleElement, (T_Node & {
        x: number;
        y: number;
    }), SVGGElement, unknown> => {

        const { gasColorScale, sectorColorScale } = this.state;
        const svg = d3.select("#ctn-force-network").select("#svg-network-force");

        // Create Circle
        // Section to change radius of circle size
        const nodes = svg.append("g")
            .attr("id", "nodes")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle");


        nodes
            .style("fill", (d: any) => {
                if (d["type"] === "sector") {
                    return sectorColorScale[d["name"]] as any;
                }

                return gasColorScale[d["name"]];
            })
            .attr("class", (d: any) => {

                let name = d["sector"];
                name = name.replaceAll(/[^a-zA-Z]+/g, "-");

                return `${name.toLowerCase()}`;
            })
            .style("stroke", "black")
            .attr("r", (d) => {


                // Add the size here
                return d["value"] / 2;
            })
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


                // // Hide the tooltips
                // d3.select("#tooltip")
                //     .transition()
                //     .duration(200)
                //     .style("opacity", 0);

                setTimeout(() => {
                    this.setState({
                        tooltipValue: {}
                    });
                }, 100);

            })
            .on("mousemove", function (event, d) {

                console.log;

                d3.select("#tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            });

        return nodes;
    };

    addDragEvent = (node: d3.Selection<SVGCircleElement, (T_Node & {
        x: number;
        y: number;
    }), SVGGElement, unknown>,
    simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>
    ) => {
        node.call(d3.drag()
            .on("start", (event, d) => this.dragstarted(event, d, simulation))
            .on("drag", (event, d) => this.dragged(event, d, simulation))
            .on("end", (event, d) => this.dragended(event, d, simulation)) as any);
    };

    addLink = async (): Promise<{
        source: number;
        target: number;
    }[]> => {

        const data = await this.getLinkData() as T_Link[];

        /* Add Link to the Data */
        const links: { source: number, target: number }[] = [];
        data.map(link => {

            const obj = {
                source: link.sector,
                target: link.gas
            };


            links.push(obj);
        });

        return links;
    };


    addLinkPaths = (links: {
        source: number;
        target: number;
    }[]): d3.Selection<SVGPathElement, {
        source: number;
        target: number;
    }, SVGGElement, unknown> => {

        const svg = d3.select("#ctn-force-network").select("#svg-network-force");

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



        linkPath.append("g").attr("class", "linklabelholder")
            .append("text")
            .attr("class", "linklabel")
            .attr("dx", 1)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return "my label";
            });

        return linkPath;
    };

    addSimulation = (
        node: d3.Selection<SVGCircleElement, (T_Node & {
            x: number;
            y: number;
        }), SVGGElement, unknown>,
        links: {
            source: number;
            target: number;
        }[],
        linkpath: d3.Selection<SVGPathElement, {
            source: number;
            target: number;
        }, SVGGElement, unknown>,
        data: any
    ) => {

        const { width, height } = this.state;

        const simulation = d3.forceSimulation()
            .nodes(data)

            // .force("x", d3.forceX().strength(0.1).x(d => xPosition(d.class)))
            .force("x", d3.forceX().strength(0.5).x(width + 100 / 2))
            .force("y", d3.forceY().strength(0.1).y(height + 100 / 2))
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(50).strength(0.5))
            .force("charge", d3.forceManyBody().strength(-30))
            .force("collide", d3.forceCollide().strength(0.2).radius(80))
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


    createColorScale = async () => {
        const sectorType = [ "Total including LUCF",
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
            "Other Fuel Combustion"
        ].sort();

        const sectorColorScale: { [key: string]: string } = {};

        const color = d3.scaleOrdinal()
            .range(this.state.sectorColor);

        sectorType.map((key, index) => {
            sectorColorScale[key] = color(index.toString()) as string;
        });

        this.setState({
            sectorColorScale
        });
    };


}

export default D3ForceNetWork;