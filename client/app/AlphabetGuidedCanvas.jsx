import React from 'react';
import PropTypes from 'prop-types';
import {calculateNextState, flattenCurve, initialGameState, isCloseProximity, scaleCurveCoOrdinates} from "./AlphabetUtils";
import {Stage, Layer, Line, Circle} from 'react-konva';
import LineOrQuadraticCurve from './LineOrQuadraticCurve';
import {CurveShape} from "./ReactPropTypeShapes";

class AlphabetGuidedCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            curves: props.origCurves,
            stageWidth: props.origWidth,
            stageHeight: props.origHeight,
            gameState: initialGameState(),
            proximityDelta: props.origWidth / 25,
            lineStart: null,
            lineEnd: null
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
        const {origCurves, origWidth, origHeight} = this.state;
        const width = this.container ? this.container.offsetWidth : origWidth;
        const scaleX = width / origWidth;

        this.setState({
            curves: origCurves.map(curve => scaleCurveCoOrdinates(curve, {x: scaleX, y: 1})),
            stageWidth: width,
            stageHeight: origHeight,
            gameState: initialGameState(),
            proximityDelta: width / 25,
            lineStart: null,
            lineEnd: null
        });
    };

    handleStageMouseDown = e => {
        const {curves, gameState, proximityDelta} = this.state;
        const stage = e.target.getStage();

        let pos = stage.getPointerPosition();
        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];

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

        let newGameState = gameState;

        // start-point already selected and checking if mouse was up on end-point
        if (lineStart && isCloseProximity(pos, nextPoint, proximityDelta)) {
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
        const {curves, stageWidth, stageHeight, gameState, proximityDelta, lineStart, lineEnd} = this.state;
        const strokeWidth = stageWidth / 50;
        let startPoint = curves[gameState.currentCurveIdx][gameState.currentPointIdx];
        let nextPoint = curves[gameState.nextCurveIdx][gameState.nextPointIdx];

        return (
            <div style={{width: "100%", border: "1px solid grey"}} ref={node => {this.container = node;}}>
                <Stage width={stageWidth} height={stageHeight}
                       onMouseDown={this.handleStageMouseDown}
                       onTouchStart={this.handleStageMouseDown}
                       onMouseUp={this.handleStageMouseUp}
                       onTouchEnd={this.handleStageMouseUp}
                       onMouseMove={this.handleStageMouseMove}
                       onTouchMove={this.handleStageMouseMove}
                >
                    <Layer>
                        {curves.slice(0, gameState.currentCurveIdx).map((curve, index) => {
                            return <LineOrQuadraticCurve key={index} points={curve} stroke={'red'} strokeWidth={strokeWidth} />
                        })
                        }

                        {/*not sure why the Curve component does not work here*/}
                        <Line
                            points={flattenCurve(curves[gameState.currentCurveIdx].slice(0, gameState.currentPointIdx + 1))}
                            stroke='red'
                            strokeWidth={strokeWidth}
                            lineCap='round'
                            lineJoin='round'
                            tension={0.7}
                        />

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
            </div>
        );
    }
}

AlphabetGuidedCanvas.propTypes = {
    origCurves: PropTypes.arrayOf(CurveShape),
    origHeight: PropTypes.number,
    origWidth: PropTypes.number
};

export default AlphabetGuidedCanvas;