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
        sector: "Total excluding LUCF"
    };
    async componentDidMount() {
        const sectorForCountryOverTheYears = []
        const yearchosen = this.state.yearchosen;
        const country = this.state.country;
        const jsonData = await d3.json("/assets/historical_emission.json") as T_Gases_Emission;
        // const testHistoricalJsonData = await d3.json("/assets/historical_emission.json") as T_Gases_Emission;
        const data = jsonData[yearchosen][country]
        //Adding year to the json object, array includes all the years for that country and its specfic sector
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                var tempObj = jsonData[key][country]
                for (var i = 0; i < tempObj.length; i++) {
                    tempObj[i]["year"] = key
                    var arrayGas = tempObj[i]["gases"]
                    for (var j = 0; j < arrayGas.length; j++) {
                        arrayGas[j]["year"] = key
                    }
                    var currentObj = tempObj[i]
                    if (currentObj.name == this.state.sector) {
                        sectorForCountryOverTheYears.push(currentObj)
                    }
                }
            }
        }
        // console.log(sectorForCountryOverTheYears)
        this.drawLineChart(sectorForCountryOverTheYears)
    }
    render(): JSX.Element {

        return (

            <div id="my_dataviz" >
                <style jsx>{`
                    .tooltip{
                        position: absolute;
                        text-align: center;
                        width: 60px;
                        height: 50px;
                        padding: 2px;
                        font: 12px sans-serif;
                        background: lightsteelblue;
                        border: 0px;
                        border-radius: 8px;
                        pointer-events: none;
                    }
                    
                 
                `}</style>
            </div>
        );
    }
    drawLineChart = (data: []) => {
        const { country, sector } = this.state;
        //Need to select dont append and do the check to prevent the react from rendering the linechart twice 
        const lineChart = d3.select("#my_dataviz").select("svg")
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        if (lineChart.size() > 0) {
            return;
        }

        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 1000 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // group the data: I want to draw one line per group
        const arrayGas = data.map((d) => {
            return d["gases"]
        })
        const flatArrayGas = arrayGas.flat();
        const groupDataByGas = d3.group(flatArrayGas, d => d.name); // nest function allows to group the calculation per level of a factor
        // Add X axis --> it is a date format
        const x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.year; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            //change tick for the number of years in the x axis
            .call(d3.axisBottom(x).ticks(20));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(flatArrayGas, function (d) { return d.value; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // color palette
        const color = d3.scaleOrdinal()
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
        console.log("flatarrayGas below")
        console.log(flatArrayGas)
        // Draw the line
        svg.selectAll(".line")
            .data(groupDataByGas)
            .join("path")
            .attr("fill", "none")
            .attr("stroke", function (d) { return color(d[0]) })
            .attr("stroke-width", 8)
            .attr("d", function (d) {
                return d3.line()
                    .x(function (d) { return x(d.year); })
                    .y(function (d) { return y(+d.value); })
                    (d[1])
            })
            .on('mouseover', function (event, d) {

                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.5');
                //Makes the new div appear on hover:
                div.transition()
                    .duration(50)
                    .style("opacity", 1);
                let tipString = d[0]
                div.html(tipString)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {

                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                //Makes the new div disappear:
                div.transition()
                    .duration('50')
                    .style("opacity", 0);
            });
    }

}

export default D3Chart