/* NODE MODULES */
import React from "react";

/* STYLES */

/* TYPES */
interface I_Props {
    className?: string
    children: React.ReactNode
}

interface I_State {
    active: boolean
}

class Reveal extends React.PureComponent<I_Props, I_State> {

    _ref: React.RefObject<HTMLDivElement>;

    constructor(props: I_Props) {
        super(props);

        this.state = {
            active: false
        };

        this._ref = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.handleScroll();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render(): JSX.Element {

        return (
            <>
                <style jsx>{`
                    .ctn-reveal{
                        position: relative;
                        transform: translateY(150px);
                        opacity: 0;
                        transition: all 2s ease;
                    }
                    .ctn-reveal.active{
                        transform: translateY(0px);
                        opacity: 1;
                    }
                `}</style>
                <div
                    className={`ctn-reveal ${this.state.active ? "active" : ""}`}
                    ref={this._ref}
                >
                    {this.props.children}
                </div>
            </>
        );
    }


    handleScroll = () => {

        const topHeight = this._ref.current?.getBoundingClientRect().top as number;
        const revealPoint = 150;

        /**
         * If state is not active and the 
         * reveal point is less than the current height of the element
         */

        if (!this.state.active && revealPoint < window.innerHeight - topHeight) {
            this.setState({
                active: true
            });

            return;
        }


    };

}

export default Reveal;