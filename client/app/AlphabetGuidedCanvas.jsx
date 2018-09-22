import React from 'react';
import {initialGameState, calculateNextState, scaleCurvesCoOrdinates, isCloseProximity, flattenCurve} from "./AlphabetUtils";
import {Stage, Layer, Line, Circle} from 'react-konva';

class AlphabetGuidedCanvas extends React.Component {
    constructor(props) {
        super(props);

        const {origCurves, origHeight, origWidth} = props;
        const stageWidth = 400;
        const stageHeight = 400;

        this.state = {
            curves: scaleCurvesCoOrdinates( origCurves, {x: stageWidth / origWidth, y: stageHeight / origHeight}),
            gameState: initialGameState(),
            height: stageHeight,
            width: stageWidth,
            strokeWidth: stageWidth / 50,
            proximityDelta: stageWidth / 25,
            lineStart: null,
            lineEnd: null
        };
    }

    handleStageMouseDown = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();

        let pos = stage.getPointerPosition();
        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        console.log("on mouse down");
        console.log(`lineStart=${lineStart}, nextPoint=${nextPoint}, pos=${pos}`);

        // start point not selected yet; check if mouse is near start point
        if (isCloseProximity(pos, startPoint, proximityDelta)) {
            // mark start point selected
            this.setState({lineStart: pos});
        }
        this.animateStartEnd();
    };

    handleStageMouseUp = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();
        let pos = stage.getPointerPosition();
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        console.log("on mouse up");
        console.log(`lineStart=${lineStart}, nextPoint=${nextPoint}, pos=${pos}`);

        let newGameState = gameState;

        // start-point already selected and checking if mouse was up on end-point
        if (lineStart && isCloseProximity(pos, nextPoint, proximityDelta)) {
            console.log("getting new state");
            newGameState = calculateNextState(curves, gameState);
        }
        this.setState({gameState: newGameState, lineStart: null, lineEnd: null});
        this.animateStartEnd();
    };

    handleStageMouseMove = e => {
        const {curves, gameState, proximityDelta, lineStart} = this.state;
        const stage = e.target.getStage();

        let pos = stage.getPointerPosition();
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        if (lineStart) {
            if (isCloseProximity(pos, nextPoint, proximityDelta)) {
                const newGameState = calculateNextState(curves, gameState);
                this.setState({gameState: newGameState, lineStart: nextPoint, lineEnd: null});
            } else {
                this.setState({lineEnd: pos});
            }
        }
    };

    animateStartEnd() {
        const {proximityDelta, lineStart} = this.state;
        if (lineStart) {
            this.nextCircle && this.nextCircle.to({
                radius: proximityDelta * 1.2,
                duration: 0.5
            });
            this.currentCircle && this.currentCircle.to({
                radius: proximityDelta * 0.8,
                duration: 0.5
            })
        } else {
            this.currentCircle && this.currentCircle.to({
                radius: proximityDelta * 1.2,
                duration: 0.5
            });
            this.nextCircle && this.nextCircle.to({
                radius: proximityDelta * 0.8,
                duration: 0.5
            });
        }
    }

    render() {
        const {curves, gameState, height, width, strokeWidth, proximityDelta, lineStart, lineEnd} = this.state;
        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        const createCurve = (curve, idx) => {
            return <Line
                key={idx}
                points={flattenCurve(curve)}
                stroke='red'
                strokeWidth={strokeWidth}
                lineCap='round'
                lineJoin='round'
                tension={0.7}
            />
        };

        return (
            <Stage width={width}
                   height={height}
                   onMouseDown={this.handleStageMouseDown}
                   onTouchStart={this.handleStageMouseDown}
                   onMouseUp={this.handleStageMouseUp}
                   onTouchEnd={this.handleStageMouseUp}
                   onMouseMove={this.handleStageMouseMove}
                   onTouchMove={this.handleStageMouseMove}
            >
                <Layer>
                    {curves.slice(0, gameState.currentCurveIdx).map((curve, index) => {return createCurve(curve, index)})}

                    {createCurve(curves[gameState.currentCurveIdx].slice(0, gameState.currentPointIdx + 1))}

                    {(startPoint !== nextPoint) &&
                    <Circle
                        ref={node => {
                            this.currentCircle = node;
                        }}
                        x={startPoint.x}
                        y={startPoint.y}
                        radius={proximityDelta}
                        fill="green"
                        stroke={'black'}
                        strokeWidth={strokeWidth}
                    />
                    }

                    {(startPoint !== nextPoint) &&
                    <Circle
                        ref={node => {
                            this.nextCircle = node;
                        }}
                        x={nextPoint.x}
                        y={nextPoint.y}
                        radius={proximityDelta}
                        fill="red"
                        stroke={'black'}
                        strokeWidth={strokeWidth}
                    />
                    }

                    {lineStart && lineEnd &&
                    <Line
                        points={[lineStart.x, lineStart.y, lineEnd.x, lineEnd.y]}
                        stroke='red'
                        strokeWidth={strokeWidth}
                        lineCap='round'
                        lineJoin='round'
                        tension={0.7}
                    />
                    }
                </Layer>
            </Stage>
        );
    }
}

export default AlphabetGuidedCanvas;