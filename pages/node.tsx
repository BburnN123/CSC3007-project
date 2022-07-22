import D3ForceNetWork from "@base/components/d3/d3-force-network";
import React from "react";



class NodePage extends React.PureComponent {

    render(): JSX.Element {



        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3ForceNetWork
                    country={"Afghanistan"}
                    year={2019}
                />

            </div>

        );
    }

}


export default NodePage;