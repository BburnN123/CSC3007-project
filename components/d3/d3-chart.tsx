/* NODE MODULES */
import React from "react";
import * as d3 from "d3";
import axios from "axios";

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
    sector: string
    value: number
    gases: T_Gases[]
}
type I_State = {
    width: number
    height: number
    colorScale: { [key: string | number]: string | boolean }
    yearchosen: number
    country: string
    sector: string
}

interface I_Props {
    country: string
}

class D3Chart extends React.PureComponent<I_Props> {
    state: I_State = {
        // optional second annotation for better type inference
        yearchosen: 2019,
        country: "Afghanistan",
        width: 0,
        height: 0,
        colorScale: {},
        sector: "Agriculture"
    };
    async componentDidMount() {
        const sectorForCountryOverTheYears = []
        const yearchosen = this.state.yearchosen;
        const country = this.state.country;
        const jsonData = await d3.json("/assets/test.json") as T_Gases_Emission;
        const data = jsonData[yearchosen][country]
        //Adding year to the json object, array includes all the years for that country and its specfic sector
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                var tempObj = jsonData[key][country]
                for (var i = 0; i < tempObj.length; i++) {
                    tempObj[i]["year"] = key
                    var currentObj = tempObj[i]
                    if (currentObj.sector == this.state.sector) {
                        sectorForCountryOverTheYears.push(currentObj)
                    }
                }
            }
        }

        this.drawLineChart(sectorForCountryOverTheYears)
    }
    render(): JSX.Element {
        return (
            <div id="my_dataviz"></div>
        );
    }


    drawLineChart = (data: []) => {
        const { country, sector } = this.state;

        //Need to select dont append and do the check to prevent the react from rendering the linechart twice 
        const lineChart = d3.select("#my_dataviz").select("svg")
        if (lineChart.size() > 0) {
            return;
        }
        //set the dimensions and margins of the graph
        // const cleanDataGas = data.map((sectorCurrent) => {
        //     const gases = sectorCurrent["gases"].map((g, i) => {
        //         if (sectorCurrent.sector == sector) {
        //             sectorArray.push(sectorCurrent)
        //         }
        //         return {
        //             sector,
        //             gas: g["name"],
        //             value: g["value"]
        //         }
        //     })

        //     return gases
        // })

        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // group the data: I want to draw one line per group
        const sumstat = d3.group(data, d => d.gases.name); // nest function allows to group the calculation per level of a factor
        // Add X axis --> it is a date format
        const x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.year; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            //change tick for the number of years in the x axis
            .call(d3.axisBottom(x).ticks(1));

        // Add Y axis
        const arrayGas = data.map((d) => {
            return d["gases"]
        })
        const flatArrayGas = arrayGas.flat();
        //console.log(flatArrayGas)

        const y = d3.scaleLinear()
            .domain([0, d3.max(flatArrayGas, function (d) { return d.value; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        // color palette
        const color = d3.scaleOrdinal()
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

        // Draw the line
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("fill", "none")
            .attr("stroke", function (d) { return color(d[0]) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {

                return d3.line()
                    .x(function (d) { return x(d.year); })
                    .y(function (d) { return y(+d.n); })
                //(d[1])
            })
    }

}

export default D3Chart