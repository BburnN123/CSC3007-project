import D3ForceNetWork, {
    T_Gases_Emission, T_Gases_Link, T_Sector
} from "@base/components/d3/d3-force-network";
import * as d3 from "d3";
import { NextPageContext } from "next";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import Text from "@base/design/text";
import NetForceDiagramToolTips from "@base/components/netforce-diagram/netforce-diagram-tooltips";


interface I_Props {
    router: NextRouter;
}

interface I_State {
    netforcedata: T_Gases_Emission
    netforcelink: T_Gases_Link
    selectedNetForce: string,
    hoverNetForce: string,
    country: string,
    selectedDataInfo: T_Sector[]
    year: number
}

class NodePage extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            netforcedata:     {},
            netforcelink:     {},
            selectedNetForce: "",
            hoverNetForce:    "",
            selectedDataInfo: [],
            country:          "Afghanistan",
            year:             2019,
        };
    }

    async componentDidMount() {

        const netforcedata = await d3.json("./../assets/historical_emission.json") as T_Gases_Emission;
        this.setState({
            netforcedata
        });
        await this.getUrlQurey();
    }


    render(): JSX.Element {


        const {
            country, year, selectedDataInfo, netforcedata
        } = this.state;


        if (Object.keys(netforcedata).length === 0) {
            return (
                <>
                    <div>
                        Processing
                    </div>
                </>
            );
        }

        const yearList = Object.keys(netforcedata);
        const data = netforcedata[year][country];


        return (
            <div>
                <style jsx>{`
                    .ctn-heading{
                        padding:30px;
                        text-align:center;
                    }

                    .ctn-body{
                      position:relative;
                    }

                    .txt-header{
                       margin-bottom:20px;
                    }



                `}</style>

                <div className="ctn-heading">
                    <Text
                        type="heading"
                        fontweight="bold"
                        textAlign="center">
                        Greenhouse Gases House Emission By Sector
                    </Text>
                </div>

                <div className="ctn-body">
                    <Container fluid>
                        <D3ForceNetWork
                            country={country}
                            year={year}
                            netforcedata={data}
                            selectedNetForce={this.state.selectedNetForce}
                            hoverNetForce={this.state.hoverNetForce}
                            getArcInformation={this.getArcInformation}
                        />

                        <NetForceDiagramToolTips
                            yearList={yearList}
                            year={year}
                            handleOnChangeDDL={this.setYear}
                            selectedDataInfo={selectedDataInfo}
                            netforcedata={data}
                            onHoverArc={this.onHoverArc}
                            onSelectedArc={this.onSelectedArc}
                            country={country} />

                    </Container>


                </div >
            </div>

        );
    }

    onHoverArc = (hoverNetForce: string) => {
        this.setState({
            hoverNetForce
        });
    };

    onSelectedArc = (selectedNetForce: string) => {
        this.setState({
            selectedNetForce
        });
    };


    getUrlQurey = async () => {

        const params = (new URL(window.location.href)).searchParams;
        const country = params.get("country") as string;
        const year = params.get("year");

        const yearQuery = parseInt(year as string);

        this.setState({
            country,
            year: yearQuery
        });
    };

    getArcInformation = (data: T_Sector[]) => {

        this.setState({
            selectedDataInfo: data
        });
    };

    setYear = (year: number) => {
        this.setState({
            year
        });
    };


}

// export const getStaticProps = async (context: NextPageContext) => {


//     // // Fetch data from external API

//     // const location = "http://localhost:3000/";

//     const location = "${location}/assets/historical_emission.json";
//     const url = "https://storage.googleapis.com/jsonstoragefile/historical_emission.json";
//     const netforcedata = await d3.json(url) as T_Gases_Emission;

//     // Pass data to the page via props
//     return {
//         props: {
//             netforcedata,

//         }
//     };
// };


export default withRouter(NodePage);

