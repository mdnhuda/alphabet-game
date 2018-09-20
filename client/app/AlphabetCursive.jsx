import React from 'react';
import PropTypes from 'prop-types';
import {flattenCurve, scaleCurveCoOrdinates} from "./AlphabetUtils";
import {CurveShape} from "./Shapes";

import {Stage, Layer, Line} from 'react-konva';

class AlphabetCursive extends React.Component {
    constructor(props) {
        super(props);

        const {origCurves, origHeight, origWidth} = props;
        const stageWidth = 400;
        const stageHeight = 400;
        const scaleX = stageWidth / origWidth;
        const scaleY = stageHeight / origHeight;

        this.state = {
            curves: origCurves.map(curve => flattenCurve(scaleCurveCoOrdinates(curve, {x: scaleX, y: scaleY}))),
            height: stageHeight,
            width: stageWidth,
            strokeWidth: stageWidth / 50
        };
    }

    render() {
        const {curves, height, width, strokeWidth} = this.state;

        return (
            <Stage width={width} height={height}>
                <Layer>
                    {
                        curves.map((curve, idx) => {
                            return <Line
                                key={idx}
                                points={curve}
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
        );
    }
}

AlphabetCursive.propTypes = {
    origCurves: PropTypes.arrayOf(CurveShape),
    origHeight: PropTypes.number,
    origWidth: PropTypes.number
};

export default AlphabetCursive;