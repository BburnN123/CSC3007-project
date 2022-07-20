import D3ForceNetWork from "@base/components/d3/d3-force-network";
import D3Chart from "@base/components/d3/d3-chart"
import React from "react";

class NodePage extends React.Component {

    render() {
        const globalEmissionData = require("globalemissiondataclean1990.json");
        const testData = require("public/assets/test.json");
        // console.log(testData)
        const links = require("linksglobalemission.json")
        var globalEmissionArray = globalEmissionData
        // console.log(globalEmissionArray)


        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3Chart country="Afghanistan" />

            </div>

        );
    }

}


export default NodePage