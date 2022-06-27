/* NODE MODULES */
import React from "react";

/* STYLES */

/* TYPES */
export type T_TextColor = "white" | "black" | "error" | "warning"

export type T_TextType =
    "xxl-heading" |
    "hero-heading" |
    "heading" |
    "sub-heading" |
    "title" |
    "sub-title" |
    "body"


export type T_FontWeight =
    "light" |
    "bold" |
    "bolder"

export type T_TextAlign =
    "center" |
    "left" |
    "right" |
    "justify"

export type T_JustifyAlign =
    "start" |
    "center" |
    "end"


interface I_Props {
    children: React.ReactNode
    type?: T_TextType,
    color?: T_TextColor,
    fontweight?: T_FontWeight
    textAlign?: T_TextAlign
    justify?: T_JustifyAlign
}

class Text extends React.PureComponent<I_Props> {

    render(): JSX.Element {

        const textType = this.props.type || "body";
        const textColor = this.props.color || "black";
        const fontweight = this.props.fontweight || "light";

        /* TEXT STYLE */
        const textAlign = this.props.textAlign ? `text-${this.props.textAlign}` : "";
        const justifyContent = this.props.justify ? `align-item-${this.props.justify}` : "";

        const textStyle = (`${textAlign} ${justifyContent}`).trim();

        return (
            <>
                <style jsx>{`
                    .txt-content{
                        height: 100%;
                    }
                /* HEADER STYLE */
                .xxl-heading{
                    font-size: 60px;
                    font-weight: 700;
                    line-height: 60px;
                }
                    .hero-heading{
                        font-size: 40px;
                        font-weight: 700;
                        line-height: 22px;
                    }
                    .heading{
                        font-size: 32px;
                        font-weight: 500;
                        line-height: 22px;
                    }
                    .sub-heading{
                        font-size: 28px;
                    }
                    .title{
                        font-size : 24px;
                        line-height: 1.6;
                    }
                    .sub-title{
                        font-size : 18px;
                        line-height: 1.6;
                    }
                    .body{
                        font-size : 16px;
                        line-height: 1.6;
                    }
                /* FONT STYLE */
                    .light {
                        font-weight : 300
                    }
                    .bold{
                        font-weight : 500
                    }
                    .bolder{
                        font-weight : 900
                    }
                /* COLOR STYLE */
                    .white{
                        color : #FFFFFF;
                    }
                    .black{
                        color : #000000;
                    }
                    .error{
                        color : #DD2C00;
                    }
                    .warning{
                        color : #FFCC00;
                    }
                /* TEXT ALIGN STYLE */
                    .text-center{
                        text-align : center;
                    }
                    .text-left{
                        text-align : left;
                    }
                    .text-right{
                        text-align : left;
                    }
                    .text-justify{
                        text-align : justify;
                    }
     
                 
                `}</style>

                <div className={`txt-content ${textStyle}`}>
                    <span className={`${textType} ${textColor} ${fontweight}`}>
                        {this.props.children}
                    </span>
                </div>
            </>
        );
    }
}

export default Text;