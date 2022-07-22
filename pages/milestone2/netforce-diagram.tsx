import D3Circle from "@base/components/d3/d3-circle";
import D3ForceNetWork, { T_Gases_Emission, T_Gases_Link } from "@base/components/d3/d3-force-network";
import * as d3 from "d3";
import { NextPageContext } from "next";
import {
    NextRouter, useRouter, withRouter
} from "next/router";
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";

interface I_Props {
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
    router: NextRouter;
}

interface I_State {
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
}

class NodePage extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            netforcedata: {},
            netforcelink: {}
        };
    }

    async componentDidMount() {

        console.log(this.props.netforcedata);

        // const netforcelink = await d3.json("../assets/network_link.json") as T_Gases_Link;
        // const netforcedata = await d3.json("../assets/network_data.json") as T_Gases_Emission;

        // this.setState({
        //     netforcelink,
        //     netforcedata
        // });
    }

    render(): JSX.Element {

        const { netforcedata, netforcelink } = this.props;
        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3ForceNetWork
                    country={"Afghanistan"}
                    year={2019}
                    netforcelink={netforcelink}
                    netforcedata={netforcedata}

                />
                <Container>
                    <Row>
                        <Col md="auto">


                        </Col>
                        <Col>
                            <D3Circle
                                country={"Afghanistan"}
                                year={2019}
                                gasemissiondata={netforcedata}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

}

export const getStaticProps = async (context: NextPageContext) => {


    // // Fetch data from external API

    const location = "http://localhost:3000/";
    const netforcelink = await d3.json(`${location}/assets/network_link.json`) as T_Gases_Link;
    const netforcedata = await d3.json(`${location}/assets/network_data.json`) as T_Gases_Emission;


    // Pass data to the page via props
    return {
        props: {
            netforcelink,
            netforcedata
        }
    };
};


export default withRouter(NodePage);

