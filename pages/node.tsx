import D3ForceNetWork from "@base/components/d3/d3-force-network";
import React from "react";
import { Toast } from "react-bootstrap"
type MyProps = {
    // using `interface` is also ok
    message: string;
};
type MyState = {
    count: number; // like this
};
class NodePage extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        count: 0,
    };
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
                <D3ForceNetWork data_link={links} data_case={globalEmissionArray}></D3ForceNetWork>
                {this.props.message} {this.state.count}
            </div>

        );
    }

}


export default NodePage