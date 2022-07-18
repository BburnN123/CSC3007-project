import D3ForceNetWorkHello from "@base/components/d3/d3-force-networkhello";
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
                <D3ForceNetWorkHello />

            </div>

        );
    }

}


export default NodePage