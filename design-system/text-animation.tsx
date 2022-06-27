/* NODE MODULES */
import React from "react";

/* COMPONENTS */
import Text from "@base/design/text";

interface I_Props {
    words: string[]
    interval?: number
}

interface I_State {
    counter: number
    text: string
}

class TextAnimation extends React.PureComponent<I_Props, I_State> {

    constructor(props: I_Props) {
        super(props);
        this.state = {
            counter: 0,
            text:    ""
        };
    }

    async componentDidMount() {

        this.setState({
            text: this.props.words[0]
        });
    }

    render(): JSX.Element {
        this.animateText();

        return (
            <>
                <style jsx>{`
                    #changeTextContainer {
                        transition: opacity 400ms;
                    }

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
                <div id="changeTextContainer">
                    <Text type="xxl-heading" color="white" fontweight="bold">
                        <div

                            dangerouslySetInnerHTML={{ __html: this.state.text }}
                        />

                    </Text>
                </div>
            </>
        );
    }

    animateText = () => {

        const interval = this.props.interval || 700;

        let { counter } = this.state;
        const { words } = this.props;

        setTimeout(() => {

            counter = counter + 1;

            if (counter >= words.length) {
                counter = 0;
            }

            this.setState({
                counter: counter,
                text:    words[counter]
            });

        }, (interval));


    };
}

export default TextAnimation;