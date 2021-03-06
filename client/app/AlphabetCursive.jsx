import React from 'react';
import PropTypes from 'prop-types';
import {flattenCurve, scaleCurveCoOrdinates} from "./AlphabetUtils";
import {CurveShape} from "./ReactPropTypeShapes";

import {Stage, Layer, Line} from 'react-konva';

class AlphabetCursive extends React.Component {
    constructor(props) {
        super(props);

        console.log("in constructor");
        this.state = {
            ...props,
            stageWidth: props.origWidth
        };
    }

    componentDidMount() {
        this.checkSize();
        // here we should add listener for "container" resize
        // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
        // for simplicity I will just listen window resize
        window.addEventListener("resize", this.checkSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkSize);
    }

    checkSize = () => {
        const width = this.container ? this.container.offsetWidth : this.state.origWidth;
        this.setState({
            stageWidth: width,
        });
    };

    render() {
        const {origCurves, origWidth, origHeight, stageWidth} = this.state;
        const strokeWidth = stageWidth / 50;
        const scale = stageWidth / origWidth;

        const scaledCurves = origCurves.map(curve => scaleCurveCoOrdinates(curve, {x: scale, y: scale}));
        return (
            <div style={{width: "100%"}} ref={node => {this.container = node;}}>
                <Stage width={stageWidth} height={origHeight}>
                    <Layer>
                        {
                            scaledCurves.map((curve, idx) => {
                                return <Line
                                    points={flattenCurve(curve)}
                                    stroke='red'
                                    strokeWidth={strokeWidth}
                                    lineCap='round'
                                    lineJoin='round'
                                    tension={0.7}
                                />
                            })
                        }
                    </Layer>
                </Stage>
            </div>
        );
    }
}

AlphabetCursive.propTypes = {
    origCurves: PropTypes.arrayOf(CurveShape),
    origHeight: PropTypes.number,
    origWidth: PropTypes.number
};

export default AlphabetCursive;