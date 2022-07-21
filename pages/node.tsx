import D3Chart from "@base/components/d3/d3-chart"
import React from "react";

class NodePage extends React.Component {

    render() {


        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3Chart country="Afghanistan" />

            </div>

        );
    }

}


export default NodePage