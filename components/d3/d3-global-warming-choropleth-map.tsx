/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import axios from "axios";
import GlobalWarmingSlider from "@base/components/gloabl-warming/global-warming-slider";
import {
    Container, Row, Col
} from "react-bootstrap";
import GlobalWarmingToolTip from "@base/components/gloabl-warming/global-warming-tooltip";


/* COMPONENTS */

/* UTILS */

/* TYPES */
type T_FeaturesMap = {
    type: string
    geometry: { type: string, coordinates: any[] }
    id: string
    properties: { name: string }
}

type T_TempChange = {
    [year: number]: {
        [countries: string]: {
            [month: number | string]: number
        }
    }
}

type T_Data = {
    features: T_FeaturesMap[]
    type: string
}

interface I_Props {
    type: "globe" | "map"
    enableRotation?: boolean
    drawGraticules?: boolean
    size?: { width: number, height: number }

}

interface I_State {
    color: any,
    colorLegend: any,
    colorFillLegend: { [key: number]: string }
    geopath: any
    year: number
    tooltipCountry: string
}


class D3GlobalWarmingChoroplethMap extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            color:           d3.schemeBlues[9],
            colorLegend:     d3.scaleSqrt([ 0.1, 0.8 ], [ "blue", "red" ]),
            colorFillLegend: {},
            geopath:         null,
            year:            1996,
            tooltipCountry:  "China"
        };
    }

    async componentDidMount() {
        this.drawMap();
    }

    render(): JSX.Element {
        return (
            <>
                <style jsx global>{`
                    #countries {
                        stroke-width: 0.5;
                        stroke: antiquewhite;
                        fill: #666;
                    }       

                    .selected {
                        stroke-width: 2;
                        stroke: black;
                        cursor:pointer;
                    }
                `}</style>
                <style jsx>{`

                    #svg-map{
                        position:absolute;
                        left:0; 
                        top:0;
                        width:100%;
                        height:100%
                    }

                    #ctn-map{
                        position:relative;
                        width:800px;
                        height:500px;
                      
                    }
                `}</style>
                <div className="ctn-slider">
                    <GlobalWarmingSlider
                        minYear={1996}
                        maxYear={2018}
                        handleOnSliderChange={this.handleOnSliderChange} />
                </div>
                <Container fluid>
                    <Row>
                        <Col md="auto">
                            <div id="ctn-map"></div>
                        </Col>
                        <Col>
                            <GlobalWarmingToolTip
                                year={this.state.year}
                                country={this.state.tooltipCountry} />
                        </Col>
                    </Row>


                </Container>

            </>
        );
    }

    drawMap = async () => {

        const promiseData = await axios.get("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        const data = promiseData.data as T_Data;

        const { drawGraticules, enableRotation } = this.props;
        const ctnMap = d3.select("#ctn-map").select("svg");
        if (ctnMap.size() > 0) {
            return;
        }

        let width = 800;
        let height = 500;
        if (this.props.size) {
            width = this.props.size.width;
            height = this.props.size.height;
        }


        d3.select("#ctn-map").append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("id", "svg-map");


        const projection = this.getProjection();
        const geopath = d3.geoPath().projection(projection); // Transform it to x y position

        this.setState({
            geopath
        });


        // this.colourOcean(geopath);
        this.setLegend();
        this.drawCountries(data, geopath);

        if (drawGraticules) {
            this.drawGraticules(geopath);
        }

        if (enableRotation) {
            this.enhableRotation(projection, geopath);
        }
    };

    colourOcean = (geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>) => {

        const svg = d3.select("#ctn-map").select("svg");

        // Def gradient
        const def = svg.append("defs")
            .append("linearGradient")

            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        def.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "rgb(0,0,27)")
            .style("stop-opacity", 1);

        def.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "rgb(51,122,183)")
            .style("stop-opacity", 1);

        svg.append("path")
            .datum({ type: "Sphere" })
            .attr("id", "ocean")
            .attr("d", geopath as any)
            .attr("fill", "url(#oceanGradient)")
            .attr("fill", "lightBlue");
    };

    // GeoGraticule - Grid 
    drawGraticules = (geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>): void => {

        const svg = d3.select("#ctn-map").select("svg");
        const graticule = d3.geoGraticule()
            .step([ 10, 10 ]);

        svg.append("g")
            .attr("id", "graticules")
            .selectAll("path")
            .data([ graticule() ])
            .enter()
            .append("path")
            .attr("d", d => geopath(d))
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("stroke-width", 0.2);
    };

    // Counties
    drawCountries = async (
        data: T_Data,
        geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>
    ) => {

        const svg = d3.select("#ctn-map").select("svg");

        const jsonData = await d3.json("/assets/temp_change.json") as T_TempChange;

        const def = svg.append("defs")

            // .append("linearGradient")
            .attr("id", "earthGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        def.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "#074C00")
            .style("stop-opacity", 1);

        def.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "#B8E2A3")
            .style("stop-opacity", 1);

        const { color, year } = this.state;

        // Draw the map
        svg.append("g")
            .attr("id", "countries")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .classed("countries-path", true)
            .attr("d", d => geopath(d as any))
            .attr("fill", (d: any) => {

                const country = d.properties.name;
                let colorStyleFill = "#666";


                if (!(country in jsonData[year])) {
                    return colorStyleFill;
                }

                const avg_tempature = jsonData[year][country]["average"];


                if (isNaN(avg_tempature)) {
                    return colorStyleFill;
                }

                colorStyleFill = color(avg_tempature);

                return colorStyleFill;
            })
            .on("mouseover", (event, d) => {

                d3.select(event.currentTarget)
                    .classed("selected", true);

                d3.select("#tooltip");


                // .style("left", (event.pageX + 10) + "px")
                // .style("top", (event.pageY + 10) + "px");

                // Display the tooltips
                // d3.select("#tooltip")
                //     .transition()
                //     .duration(200)
                //     .style("opacity", 1)
                //     .text(d.properties.name);
            })
            .on("mouseout", (event, d) => {

                // d3.select(".tooltip")
                //     .text("");

                d3.select(event.currentTarget)
                    .classed("selected", false);
            })
            .on("click", (event, d) => {

                this.setState({
                    tooltipCountry: d.properties.name
                });

            });
    };

    // Enable Rotation
    enhableRotation = (
        projection: d3.GeoProjection,
        geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>
    ) => {

        const svg = d3.select("#ctn-map").select("svg");

        const config = {
            speed:          0.009,
            verticalTilt:   0,
            horizontalTilt: 0
        };

        d3.timer(function (elapsed) {
            projection.rotate([ config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt ]);
            svg.selectAll("path").attr("d", geopath as any);
        });
    };

    // Get Projection
    getProjection = (): d3.GeoProjection => {

        // Map and projection
        const { type } = this.props;

        let projection = d3
            .geoOrthographic();

        switch (type) {
        case "globe":
            projection = d3.geoOrthographic();
            break;
        case "map":
            projection = d3.geoEquirectangular();
            break;
        }

        return projection;

    };

    setLegend = async () => {

        // const svg = d3.select("#svg-color-quant");

        const svg = d3.select("#ctn-map").select("svg");

        const colorScale = d3.scaleLinear()
            .domain([ -0.5, 0.0, 0.5 ])
            .range([ "#9db4FF", "#FFBB7B" ] as any);

        const legend = legendColor()
            .scale(colorScale);


        svg.append("g")
            .attr("class", "legendQuant")
            .attr("transform", "translate(20,20)")
            .on("click", (event, d) => {
                console.log(event);
            });


        svg.select(".legendQuant")
            .call(legend as any)
        ;


        /* SET LEGEND AND COLOR RANGE */
        this.setState({
            color: colorScale
        });
    };

    reFilledColorMap = async () => {
        const promiseData = await axios.get("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        const data = promiseData.data as T_Data;
        const jsonData = await d3.json("/assets/temp_change.json") as T_TempChange;

        const svg = d3.select("#ctn-map").select("svg");
        const { color, geopath, year } = this.state;

        svg.select("#countries")
            .data(data.features)
            .selectAll(".countries-path")
            .attr("fill", (d: any) => {

                const country = d.properties.name;
                let colorStyleFill = "#666";

                if (!(country in jsonData[year])) {
                    return colorStyleFill;
                }

                const avg_tempature = jsonData[year][country]["average"];


                if (isNaN(avg_tempature)) {
                    return colorStyleFill;
                }

                colorStyleFill = color(avg_tempature);

                return colorStyleFill;
            });
    };


    handleOnSliderChange = async (year: number) => {
        this.setState({
            year
        }, this.reFilledColorMap);

    };


}

export default D3GlobalWarmingChoroplethMap;