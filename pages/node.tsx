import D3ForceNetWork from "@base/components/d3/d3-force-network";
import React from "react";
import axios from "axios";

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
  
class NodePage extends React.PureComponent<I_Props> {

    render(): JSX.Element {
  
        const { data_link, data_cases } = this.props;


        return (
            <div>
                <h1>Greenhouse Gases House Emission By Sector</h1>
                <D3ForceNetWork 
                />

            </div>

        );
    }

}


export default NodePage;