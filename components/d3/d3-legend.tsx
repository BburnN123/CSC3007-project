// https://observablehq.com/@d3/color-legend
import React from "react";
import * as d3 from "d3";

type T_LegendFormat = "continuous" | "sequential" | "threshold" | "ordinal"

type I_Props = typeof Legend.defaultProps & {
    color: any | React.FunctionComponent
    legendType?: T_LegendFormat
    tickFormat?: string,
    tickValues?: number[]
    colorFillMap: (maxValue: number, colorLegendList: string[]) => void
};


class Legend extends React.PureComponent<I_Props> {
    static defaultProps = {
        title:        "",
        tickSize:     5,
        width:        320,
        height:       44 + 21,
        marginTop:    18,
        marginRight:  0,
        marginBottom: 16 + 21,
        marginLeft:   20,
        ticks:        320 / 64, // Width / number of tick width

        // To adjust the position of X and Y
        posX: 600,
        posY: 500
    };

    componentDidMount() {
        const { legendType } = this.props;

        const checkIfLegendCreate = d3.select("svg").selectAll("#d3-legend");
        if (checkIfLegendCreate.size() > 0) {
            return;
        }

        switch (legendType) {
        case "continuous":
            this.legendContinuous();
            break;

        default:
            this.legendContinuous();
            break;
        }

    }

    render(): JSX.Element {
        return (
            <>
            </>
        );
    }

    legendContinuous = () => {
        const {
            color,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,
            width,
            height,
            posX,
            posY
        } = this.props;
        const svg = d3.select("svg");

        const n = Math.min(color.domain().length, color.range().length);

        const { canvas, colorLegendList } = this.ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n)));

        svg
            .append("image")
            .attr("x", marginLeft + posX)
            .attr("y", marginTop + posY)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", canvas.toDataURL())
            .attr("id", "d3-legend");


        this.legendTicks();

        const maxValue = parseInt(d3.max(color.copy().domain()) as string);

        this.props.colorFillMap(maxValue, colorLegendList);
    };

    legendTicks = () => {

        const {
            color,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,
            width,
            height,
            tickSize,
            tickFormat,
            tickValues,
            ticks,
            title,
            posX,
            posY,
        } = this.props;

        const svg = d3.select("svg");

        const xscale = d3.scaleLinear()
            .domain(color.copy().domain())
            .range([ marginLeft, width - marginRight ]);

        svg.append("g")
            .attr("transform", `translate(${posX},${height - marginBottom + posY})`)
            .call(

                /* SET THE TICK */
                d3.axisBottom(xscale)
                    .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                    .tickFormat(typeof tickFormat === "function" ? tickFormat : null)
                    .tickSize(tickSize)
                    .tickValues(tickValues as any)
            )
            .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", marginLeft)
                .attr("y", marginTop + marginBottom - height - 6)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .attr("class", "title")
                .text(title));
    };

    ramp = (color: any, n = 256): {
        canvas: HTMLCanvasElement,
        colorLegendList: string[]
    } => {
        const canvas = document.createElement("canvas");
        canvas.width = n;
        canvas.height = 1;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        const colorLegendList: string[] = [];
        for (let i = 0; i < n; ++i) {
            const colorFillStyle = color(i / (n - 1));
            context.fillStyle = colorFillStyle;
            context.fillRect(i, 0, 1, 1);

            if (!colorLegendList.includes(colorFillStyle)) {
                colorLegendList.push(colorFillStyle);

            }
        }

        return {
            canvas:          canvas,
            colorLegendList: colorLegendList
        };
    };
}


export default Legend;
