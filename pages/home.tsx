/* NODE MODULES */
import React from "react";
import Image from "next/image";
import Link from "next/link";

/* COMPONENTS */
import Text from "@base/design/text";

/* UTILS */
import { E_Layout } from "@base/utils/presentation-layout";

interface I_State {
    preview: string
    positionX: number
    positionY: number
    showBox: boolean
}
class HomePage extends React.PureComponent<unknown, I_State> {

    _ref1: React.RefObject<HTMLDivElement>;
    _ref2: React.RefObject<HTMLDivElement>;

    constructor(props: unknown) {
        super(props);
        this.state = {
            preview:   "",
            positionX: 0,
            positionY: 0,
            showBox:   false
        };

        this._ref1 = React.createRef();
        this._ref2 = React.createRef();
    }

    render(): JSX.Element {

        const MileStone1 = () => (
            <ul>
                <li>
                    Pick 2 visualizations to critique / validate
                    based on data-task-idiom model and
                    suggest improvements.
                </li>
                <li>
                    Presentations of critiques to peers +
                    instructor (plus Q&A)

                </li>
                <li>
                    After feedback, either: implement
                    suggestions to improve visualization or
                    find a new project topic to submit the
                    next week.
                </li>
            </ul>
        );


        const MileStone2 = () => {
            return (
                <ul>
                    <li>
                        Final application
                        o Working web-based prototype
                        published from a Git repository.
                        o Link your presentation and project
                        documentation in the repository.
                    </li>
                </ul>
            );
        };

        return (
            <>
                <style jsx>{`
                    .ctn-home{
                        background-image: url(${E_Layout.PLAINLAYOUT});
                        background-repeat: no-repeat;
                        background-size: cover;
                        
                        width: 100%;
                        height:100vh;

                        overflow:hidden;      

                        
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }

                    .btn-image{
                        cursor:pointer;
                        width:fit-content;
                        margin:auto;
                        transition: transform .2s; /* Animation */
                    }

                    .btn-image:hover{
                        transform: scale(1.2);
                    }      

                    .box{
                        display: block;
                        position: absolute;
                        width: 400px;
                        min-height: 100px;
                        margin-top:10px;
                        top:${this.state.positionY}px;
                        left:${this.state.positionX}px;
                        background: rgb(0,0,0,0.3);
                        padding:20px;
                    }

                `}</style>
                <div className="ctn-home">
                    <Link href={{
                        pathname: "/presentation",
                        query:    {
                            slides: 1
                        }
                    }}>

                        <div className="btn-image"
                            ref={this._ref1}
                            onMouseEnter={() => this.showPreview("milestone1", this._ref1)}
                            onMouseLeave={this.resetBox}
                        >
                            <Image src="/icon/btn_milestone1.png"
                                width={300}
                                height={100}
                                alt="case study 1" />
                        </div>

                    </Link>


                    <div className="btn-image"
                        ref={this._ref2}
                        onMouseEnter={() => this.showPreview("milestone2", this._ref2)}
                        onMouseLeave={this.resetBox}
                        style={{
                            cursor: "not-allowed"
                        }}
                    >
                        <Image src="/icon/btn_milestone2.png"
                            width={300}
                            height={100}
                            alt="case study 1" />
                    </div>


                </div>

                {this.state.showBox &&
                    <div className="box"
                    >
                        <Text color="white"
                            type="sub-title"

                        >
                            {this.state.preview === "milestone1" && <MileStone1 />}
                            {this.state.preview === "milestone2" && <MileStone2 />}
                        </Text>

                    </div>
                }
            </>
        );
    }

    showPreview = (type: "milestone1" | "milestone2", ref: React.RefObject<HTMLDivElement>): void => {

        const positionX = ref.current?.getBoundingClientRect().left as number;
        const positionY = ref.current?.getBoundingClientRect().top as number;


        this.setState({
            positionX: positionX - 40,
            positionY: positionY + 100,
            preview:   type,
            showBox:   true
        });
    };

    resetBox = () => {
        this.setState({
            positionX: 0,
            positionY: 0,
            preview:   "",
            showBox:   false
        });
    };
}

export default HomePage;