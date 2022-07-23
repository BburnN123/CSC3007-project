import D3Circle from "@base/components/d3/d3-circle";
import D3ForceNetWork, { T_Gases_Emission, T_Gases_Link } from "@base/components/d3/d3-force-network";
import * as d3 from "d3";
import { NextPageContext } from "next";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import {
    Col, Container, Row
} from "react-bootstrap";
import Text from "@base/design/text";


interface I_Props {
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
    router: NextRouter;
}

interface I_State {
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
    selectedNetForce: string
}

class NodePage extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            netforcedata:     {},
            netforcelink:     {},
            selectedNetForce: ""

        };
    }
    render(): JSX.Element {

        const { netforcedata, netforcelink } = this.props;
        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>

                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col md={5}>

                            <D3ForceNetWork
                                country={"Afghanistan"}
                                year={2019}
                                netforcelink={netforcelink}
                                netforcedata={netforcedata}
                                selectedNetForce={this.state.selectedNetForce}

                            />
                        </Col>
                        <Col>
                            <Text
                                type="title"
                                fontweight="bold"
                                textAlign="center">
                                Overview of
                            </Text>


                            <D3Circle
                                country={"Afghanistan"}
                                year={2019}
                                gasemissiondata={netforcedata}
                                onHoverArc={this.onHoverArc}
                            />
                        </Col>
                    </Row>
                </Container>
            </div >

        );
    }

    onHoverArc = (selectedNetForce: string) => {
        this.setState({
            selectedNetForce
        });
    };

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

