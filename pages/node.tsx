import D3ForceNetWork from "@base/components/d3/d3-force-network";
import React from "react";

class NodePage extends React.Component {

    render() {
        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3ForceNetWork />

            </div>

        );
    }

}


export default NodePage