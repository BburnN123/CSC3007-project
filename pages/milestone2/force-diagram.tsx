/* NODE MODUELS */
import React from "react";
import axios from "axios";
import { NextPageContext } from "next";
import D3ForceNetWork from "@base/components/d3/d3-force-network";

export type T_Link = {
    infector: number
    infectee: number
    date: string
  }
  
export type T_Case = {
    id: number
    age: number
    gender: string
    nationality: string
    occupation: string
    organization: string
    date: string
    serology: string
    vaccinated: string
  }
  
  interface I_Props {
    data_link: T_Link[]
    data_cases: T_Case[]
  }
  
class ForceDiagram extends React.PureComponent<I_Props>{

    render(): JSX.Element {

        const { data_link, data_cases } = this.props;
        return (
            <>
                <D3ForceNetWork
                    data_case={data_cases}
                    data_link={data_link}
                />
            </>
        );
    }
}

// This gets called on every request
export const getStaticProps = async (context: NextPageContext) => {

    // // Fetch data from external API
    const case_response = await axios.get("https://chi-loong.github.io/CSC3007/assignments/cases-sample.json");
    const data_cases = case_response.data as T_Case[];
  
    const link_response = await axios.get("https://chi-loong.github.io/CSC3007/assignments/links-sample.json");
    const data_link = link_response.data as T_Link[];
  
    const props: I_Props = {
        data_link,
        data_cases
    };
  
    // Pass data to the page via props
    return {
        props
    };
};

export default ForceDiagram;