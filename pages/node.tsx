import React from "react";

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
        return (
            <div>
                {this.props.message} {this.state.count}
                <h1>Greenhouse Gases House Emission By Sector</h1>
            </div>
        );
    }
}

export default NodePage