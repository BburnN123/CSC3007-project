/* NODE MODULES */
import React from "react";


/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";

/* COMPONENTS */
import PresentationSlide1 from "@base/components/presentation/presentation-slides/presentation-slides1";
import PresentationSlide2 from "@base/components/presentation/presentation-slides/presentation-slides2";

/* DESIGN SYSTEM */
import Text from "@base/design/text";
import Reveal from "@base/design/reveal";

interface I_State {
    slideNumber: number,
    slideShow: React.ReactNode[]
}

class PresentationManager extends React.PureComponent<unknown, I_State> {

    _ref: React.RefObject<HTMLDivElement>;

    constructor(props: unknown) {
        super(props);

        this.state = {
            slideNumber: 0,
            slideShow:   [

            ]
        };

        this._ref = React.createRef();

    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);

        // this.handleKeyDown();
    }


    render(): JSX.Element {

        const { slideNumber, slideShow } = this.state;
        return (
            <>
                <style jsx>{`
 
                `}</style>
                <div ref={this._ref}>
                    <PresentationSlide1 />
                    {/* <PresentationSlide2 /> */}
                </div>

            </>
        );
    }


    handleKeyDown = (e: KeyboardEvent): void => {

        const { slideNumber, slideShow } = this.state;
        const slideShowLength = slideShow.length;

        switch (e.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":


            break;
        case "ArrowLeft":
            if (slideNumber === 0) {
                return;
            }

            this.setState(state => ({
                slideNumber: state.slideNumber - 1
            }));
            break;
        case "ArrowRight":

            if (slideNumber >= slideShowLength - 1) {
                return;
            }

            this.setState(state => ({
                slideNumber: state.slideNumber + 1
            }));
            break;
        }

    };

}

export default PresentationManager;
