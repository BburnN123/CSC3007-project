/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import axios from "axios";

/* COMPONENTS */

/* UTILS */

/* TYPES */
type T_FeaturesMap = {
    type: string
    geometry: { type: string, coordinates: any[] }
    id: string
    properties: { name: string }
}

type T_Data = {
    features: T_FeaturesMap[]
    type: string
}

interface I_Props {
    type: "globe" | "map"
    enableRotation?: boolean
    drawGraticules?: boolean

}


class ChoroplethMap extends React.PureComponent<I_Props> {


    async componentDidMount() {
        const promiseData = await axios.get("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        const data = promiseData.data as T_Data

        this.drawMap(data)
    }

    render(): JSX.Element {
        return (
            <>
                <style jsx>{`
                    .tooltip{
                        position : absolute;
                        background : rgb(0,0,0,0.6);
                        color: #FFF;
                        curosr:pointer
                        width:20px;
                        padding:20px;
                        opacity:0;
                    }
                    
                 
                `}</style>
                <div id="ctn-map"></div>
            </>
        )
    }

    drawMap = (data: T_Data) => {


        const { drawGraticules, enableRotation } = this.props
        const ctnMap = d3.select("#ctn-map").select("svg");
        if (ctnMap.size() > 0) {
            return
        }

        d3.select("#ctn-map").append("svg")
            .attr("viewBox", "0 0 800 500")
            .attr("preserveAspectRatio", "xMidYMid meet")

        let projection = this.getProjection()
        let geopath = d3.geoPath().projection(projection); // Transform it to x y position


        this.colourOcean(geopath)
        this.drawCountries(data, geopath)

        if (drawGraticules) {
            this.drawGraticules(geopath);
        }

        if (enableRotation) {
            this.enhableRotation(projection, geopath);
        }
    }

    colourOcean = (geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>) => {
        let svg = d3.select("#ctn-map").select("svg");

        // Def gradient
        const def = svg.append("defs")
            .append("linearGradient")
            .attr("id", "oceanGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

        def.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "rgb(0,0,27)")
            .style("stop-opacity", 1)

        def.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "rgb(51,122,183)")
            .style("stop-opacity", 1)

        svg.append("path")
            .datum({ type: "Sphere" })
            .attr("id", "ocean")
            .attr("d", geopath as any)
            .attr("fill", "url(#oceanGradient)")
        // .attr("fill", "lightBlue");
    }

    // GeoGraticule - Grid 
    drawGraticules = (geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>): void => {

        let svg = d3.select("#ctn-map").select("svg")


        let graticule = d3.geoGraticule()
            .step([10, 10]);

        svg.append("g")
            .attr("id", "graticules")
            .selectAll("path")
            .data([graticule()])
            .enter()
            .append("path")
            .attr("d", d => geopath(d))
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("stroke-width", 0.2);
    }

    // Counties
    drawCountries = (
        data: T_Data,
        geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>
    ) => {

        let svg = d3.select("#ctn-map").select("svg")

        const def = svg.append("defs")
            .append("linearGradient")
            .attr("id", "earthGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")

        def.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "#074C00")
            .style("stop-opacity", 1)

        def.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "#B8E2A3")
            .style("stop-opacity", 1)

        // Draw the map
        svg.append("g")
            .attr("id", "countries")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", d => geopath(d as any))
            .on("mouseover", (event, d) => {

                d3.select(event.currentTarget)
                    .classed("selected", true);

            })
            .on("mouseout", (event, d) => {
                d3.select(".tooltip")
                    .text("");

                d3.select(event.currentTarget)
                    .classed("selected", false);
            }).attr("fill", "#42A341")

      
    }

    // Enable Rotation
    enhableRotation = (
        projection: d3.GeoProjection,
        geopath: d3.GeoPath<any, d3.GeoPermissibleObjects>
    ) => {

        let svg = d3.select("#ctn-map").select("svg")

        const config = {
            speed: 0.009,
            verticalTilt: 0,
            horizontalTilt: 0
        }

        d3.timer(function (elapsed) {
            projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
            svg.selectAll("path").attr("d", geopath as any);
        });
    }

    // Get Projection
    getProjection = (): d3.GeoProjection => {
        // Map and projection
        const { type } = this.props

        let projection = d3
            .geoOrthographic()

        switch (type) {
            case "globe":
                projection = d3.geoOrthographic();
                break;
            case "map":
                projection = d3.geoEquirectangular();
                break;
        }

        return projection

    }


}

export default ChoroplethMap