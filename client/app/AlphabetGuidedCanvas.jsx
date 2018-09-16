import React from 'react';
import {Stage, Layer, Line, Circle} from 'react-konva';

class AlphabetGuidedCanvas extends React.Component {
    calculateNextState(curves, currentState) {
        if (curves[currentState.currentCurveIdx].length > currentState.nextPointIdx + 1) {
            console.log("moving to the next point");
            return {
                currentCurveIdx: currentState.currentCurveIdx,
                currentPointIdx: currentState.nextPointIdx,
                nextCurveIdx: currentState.currentCurveIdx,
                nextPointIdx: currentState.nextPointIdx + 1
            }
        } else if (curves.length > currentState.currentCurveIdx + 1) {
            console.log("jumping to the next curve");
            return {
                currentCurveIdx: currentState.currentCurveIdx + 1,
                currentPointIdx: 0,
                nextCurveIdx: currentState.currentCurveIdx + 1,
                nextPointIdx: 1
            }
        } else {
            console.log("end of the drawing");
            return {
                currentCurveIdx: curves.length - 1,
                currentPointIdx: curves[curves.length - 1].length - 1,
                nextCurveIdx: curves.length - 1,
                nextPointIdx: curves[curves.length - 1].length - 1
            };
        }
    }

    scaleCoOrdinates(origCurves, scale) {
        const curves = [];
        origCurves.forEach(function (arrPoints) {
            const curve = [];
            arrPoints.forEach(function (p) {
                curve.push({x: p.x * scale.x, y: p.y * scale.y});
            });
            curves.push(curve);
        });
        return curves;
    }

    createCurve(curve, strokeWidth) {
        let flattenedPoints = [];
        curve.forEach(function (p) {
            flattenedPoints.push(p.x);
            flattenedPoints.push(p.y);
        });
        return <Line
            points={flattenedPoints}
            stroke='red'
            strokeWidth={strokeWidth}
            lineCap='round'
            lineJoin='round'
            tension={0.7}
        />
    }

    createLine(start, end, strokeWidth) {
        return <Line
            points={[start.x, start.y, end.x, end.y]}
            stroke='red'
            strokeWidth={strokeWidth}
            lineCap='round'
            lineJoin='round'
            tension={0.7}
        />
    }

    createCircle(p, radius, fill, strokeWidth) {
        return <Circle
            x={p.x}
            y={p.y}
            radius={radius}
            fill={fill}
            stroke={'black'}
            strokeWidth={strokeWidth}
        />
    }

    handleStageMouseDown = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();

        let pos = stage.getPointerPosition();
        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        console.log("on mouse down");
        console.log(`lineStart=${lineStart}, nextPoint=${nextPoint}, pos=${pos}`);

        if (!lineStart) {
            if (Math.abs(pos.x - startPoint.x) < proximityDelta
                && Math.abs(pos.y - startPoint.y) < proximityDelta) {
                this.setState({lineStart: pos});
            }
        } else {
            if (Math.abs(pos.x - nextPoint.x) < proximityDelta
                && Math.abs(pos.y - nextPoint.y) < proximityDelta) {
                const newGameState = this.calculateNextState(curves, gameState);
                this.setState({gameState: newGameState});
            } else {
                this.setState({lineStart: null});
            }
        }
    };

    handleStageMouseUp = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();
        let pos = stage.getPointerPosition();
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        console.log("on mouse up");
        console.log(`lineStart=${lineStart}, nextPoint=${nextPoint}, pos=${pos}`);

        let newGameState = gameState;
        if (lineStart && Math.abs(pos.x - nextPoint.x) < proximityDelta && Math.abs(pos.y - nextPoint.y) < proximityDelta) {
            console.log("getting new state");
            newGameState = this.calculateNextState(curves, gameState);
        }
        this.setState({gameState: newGameState, lineStart: null, lineEnd: null});
    };

    handleStageMouseMove = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();

        let pos = stage.getPointerPosition();
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        //console.log("on mouse move");
        //console.log(`lineStart=${lineStart}, nextPoint=${nextPoint}, pos=${pos}`);

        if (lineStart) {
            if (Math.abs(pos.x - nextPoint.x) < proximityDelta && Math.abs(pos.y - nextPoint.y) < proximityDelta) {
                const newGameState = this.calculateNextState(curves, gameState);
                this.setState({gameState: newGameState, lineStart: pos, lineEnd: null});
            } else {
                this.setState({lineEnd: pos});
            }
        }
    };

    constructor(props) {
        super(props);

        const {origCurves, origHeight, origWidth} = props;
        const stageWidth = 400;
        const stageHeight = 400;

        const curves = this.scaleCoOrdinates( origCurves, {x: stageWidth / origWidth, y: stageHeight / origHeight});

        let gameState = {
            currentCurveIdx: 0,
            currentPointIdx: 0,
            nextCurveIdx: 0,
            nextPointIdx: 1
        };
        let lineStart = null;
        let lineEnd = null;

        this.state = {
            curves: curves,
            gameState: gameState,
            height: stageHeight,
            width: stageWidth,
            strokeWidth: stageWidth / 50,
            proximityDelta: stageWidth / 25,
            lineStart: lineStart,
            lineEnd: lineEnd
        };

        console.log("orig props");
        console.log(props);
        console.log("set state done");
        console.log(this.state);
    }

    render() {
        const {curves, gameState, height, width, strokeWidth, proximityDelta, lineStart, lineEnd} = this.state;

        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        let currentCircle = this.createCircle(startPoint, proximityDelta, "green", strokeWidth);
        let nextCircle = this.createCircle(nextPoint, proximityDelta, "red", strokeWidth);

        const layerObjects = [];
        for (let curveIdx = 0; curveIdx < gameState.currentCurveIdx; curveIdx++) {
            layerObjects.push(this.createCurve(curves[curveIdx], strokeWidth));
        }
        //draw current curve partially
        layerObjects.push(this.createCurve(curves[gameState.currentCurveIdx].slice(0, gameState.currentPointIdx + 1), strokeWidth));

        if (startPoint != nextPoint) {
            currentCircle && layerObjects.push(currentCircle);
            nextCircle && layerObjects.push(nextCircle);
        }
        if (lineStart && lineEnd) {
            layerObjects.push(this.createLine(lineStart, lineEnd));
        }

        console.log(layerObjects);

        return (
            <Stage width={width}
                   height={height}
                   onMouseDown={this.handleStageMouseDown}
                   onMouseUp={this.handleStageMouseUp}
                   onMouseMove={this.handleStageMouseMove}
            >
                <Layer>
                    {layerObjects}
                </Layer>
            </Stage>
        );
    }
}

export default AlphabetGuidedCanvas;