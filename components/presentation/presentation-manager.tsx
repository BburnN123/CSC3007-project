/* NODE MODULES */
import React from "react";

import { NextRouter, withRouter } from "next/router";

/* COMPONENTS */
import PresentationSlide1 from "@base/components/presentation/presentation-slides/presentation-slides1";
import PresentationSlide2 from "@base/components/presentation/presentation-slides/presentation-slides2";
import PresentationSlide3 from "@base/components/presentation/presentation-slides/presentation-slides3";
import PresentationSlide4 from "@base/components/presentation/presentation-slides/presentation-slides4";

/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";


/* DESIGN SYSTEM */

type T_Slideshow = {
    components: React.ReactNode
    index: number
}

interface I_Props {
    router: NextRouter
}

interface I_State {
    slideNumber: number,
    slideShow: T_Slideshow[]
    activeComponents: React.ReactNode
    activeTagSlug: string
}

class PresentationManager extends React.PureComponent<I_Props, I_State> {

    _ref: React.RefObject<HTMLDivElement>;

    constructor(props: I_Props) {
        super(props);

        this.state = {
            slideNumber: 0,
            slideShow:   [ {
                index:      0,
                components: < PresentationSlide1 />
            },
            {
                index:      1,
                components: < PresentationSlide2 />
            },
            {
                index:      2,
                components: < PresentationSlide3 />
            },
            {
                index:      3,
                components: < PresentationSlide4 />
            },
            {
                index:      4,
                components: < PresentationSlide4 />
            } ],
            activeComponents: <></>,
            activeTagSlug:    ""
        };

        this._ref = React.createRef();

    }

    async componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);

        setTimeout(() => {

            let slides = this.getSlideNumber();

            if (!slides) {
                slides = "0";
            }

            this.getAndSetSlide(parseInt(slides) - 1);
        }, 700);



    }

    render(): JSX.Element {


        return (
            <>
                <style jsx>{`
                
                    .ctn-main{
                        background-image: url(${E_Layout.PLAINLAYOUT});
                        background-repeat: no-repeat;
                        background-size: cover;
                        
                        width: 100%;
                        height:100vh;
                    }

                `}</style>

                <div className={"ctn-main "} ref={this._ref}>
                    {this.state.activeComponents}
                </div>
            </>
        );
    }

    getSlideNumber = (): string => {
        return this.props.router.query.slides as string;
    };

    getAndSetSlide = (slideNumber: number) => {

        const { slideShow } = this.state;
        slideShow.map(slide => {

            if (slide.index !== (slideNumber)) {
                return;
            }
            this.setState({
                slideNumber,
                activeComponents: slide.components
            }, this.setUrlPath);

        });
    };


    handleKeyDown = (e: KeyboardEvent): void => {

        let { slideNumber } = this.state;
        const slideShowLength = this.state.slideShow.length;

        switch (e.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            if (slideNumber === 0) {
                return;
            }

            slideNumber = slideNumber - 1;
            this.setState({
                slideNumber
            }, () => this.getAndSetSlide(slideNumber));
            break;

        case "ArrowRight":

            if (slideNumber >= (slideShowLength - 1)) {
                return;
            }

            slideNumber = slideNumber + 1;
            this.setState({
                slideNumber
            }, () => this.getAndSetSlide(slideNumber));
            break;
        }

    };

    setUrlPath = (): void => {

        const { slideNumber } = this.state;

        this.props.router.push({
            pathname: "/presentation",
            query:    {
                ...this.props.router.query,
                slides: `${slideNumber + 1}`
            }
        });

    };

}

export default withRouter(PresentationManager);
