import React from 'react';
import {Stage, Layer, Line} from 'react-konva';

class AlphabetCursive extends React.Component {
    constructor(props) {
        super(props);

        const {origCurves, origHeight, origWidth} = props;
        const stageWidth = 400;
        const stageHeight = 400;
        const scaleX = stageWidth / origWidth;
        const scaleY = stageHeight / origHeight;

        const curves = [];
        origCurves.forEach(function (curve) {
            const flattened = [];
            curve.forEach(function (p) {
                flattened.push(p.x * scaleX);
                flattened.push(p.y * scaleY);
            });
            curves.push(flattened);
        });

        this.state = {
            curves: curves,
            height: stageHeight,
            width: stageWidth,
            strokeWidth: stageWidth / 50
        };

        console.log("orig props");
        console.log(props);
        console.log("set state done");
        console.log(this.state);
    }

    render() {
        const {curves, height, width, strokeWidth} = this.state;

        const layerObjects = [];
        curves.forEach(curve => {
            layerObjects.push(
                <Line
                    points={curve}
                    stroke='red'
                    strokeWidth={strokeWidth}
                    lineCap='round'
                    lineJoin='round'
                    tension={0.7}
                />)
        });
        return (
            <Stage width={width} height={height}>
                <Layer>
                    {layerObjects}
                </Layer>
            </Stage>
        );
    }
}

export default AlphabetCursive;