/* NODE MODULES */
import React from "react";

import { NextRouter, withRouter } from "next/router";

/* COMPONENTS */
import PresentationSlide1 from "@base/components/presentation/presentation-slides/presentation-slides1";
import PresentationSlide2 from "@base/components/presentation/presentation-slides/presentation-slides2";
import PresentationSlide3 from "@base/components/presentation/presentation-slides/presentation-slides3";
import PresentationSlide4 from "@base/components/presentation/presentation-slides/presentation-slides4";
import PresentationSlide5 from "@base/components/presentation/presentation-slides/presentation-slides5";
import PresentationSlide6 from "@base/components/presentation/presentation-slides/presentation-slides6";
import PresentationSlide7 from "@base/components/presentation/presentation-slides/presentation-slides7";
import PresentationSlide8 from "@base/components/presentation/presentation-slides/presentation-slides8";
import PresentationSlide9 from "@base/components/presentation/presentation-slides/presentation-slides9";
import PresentationSlide10 from "@base/components/presentation/presentation-slides/presentation-slides10";
import PresentationSlide11 from "@base/components/presentation/presentation-slides/presentation-slides11";
import PresentationSlide12 from "@base/components/presentation/presentation-slides/presentation-slides12";
import PresentationSlide13 from "@base/components/presentation/presentation-slides/presentation-slides13";
import PresentationSlide14 from "@base/components/presentation/presentation-slides/presentation-slides14";
import PresentationSlide15 from "@base/components/presentation/presentation-slides/presentation-slides15-1";

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
                components: < PresentationSlide5 />
            },
            {
                index:      5,
                components: < PresentationSlide6 />
            },
            {
                index:      6,
                components: < PresentationSlide7 />
            },
            {
                index:      7,
                components: < PresentationSlide8 />
            },
            {
                index:      8,
                components: < PresentationSlide9 />
            },
            {
                index:      9,
                components: < PresentationSlide10 />
            },
            {
                index:      10,
                components: < PresentationSlide11 />
            },
            {
                index:      11,
                components: < PresentationSlide12 />
            },
            {
                index:      12,
                components: < PresentationSlide13 />
            },
            {
                index:      13,
                components: < PresentationSlide14 />
            },
            {
                index:      14,
                components: < PresentationSlide15 />
            },
            {
                index:      15,
                components: < PresentationSlide13 />
            },
            {
                index:      16,
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
                slides = "1";
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

                        overflow:hidden;      
                      
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
