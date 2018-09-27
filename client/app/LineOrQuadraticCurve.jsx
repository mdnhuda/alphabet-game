import React from 'react';
import PropTypes from 'prop-types';
import {Shape} from 'react-konva';
import {CurveShape} from "./ReactPropTypeShapes";

class LineOrQuadraticCurve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }
    componentDidMount() {
        console.log(this.state.points);
    }

    render () {
        const {points, stroke, strokeWidth} = this.state;
        console.log("after");
        console.log(points);
        return (
            points && points.length >= 2 &&
            <Shape
                sceneFunc={(context, shape) => {
                    context.moveTo(points[0].x, points[0].y);
                    if (points.length === 2) {
                        context.lineTo(points[1].x, points[1].y);
                    } else {
                        let i = 1;
                        for (; i < points.length - 2; i++) {
                            const xc = (points[i].x + points[i + 1].x) / 2;
                            const yc = (points[i].y + points[i + 1].y) / 2;
                            context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                        }
                        context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                    }
                    context.strokeShape(shape);
                }}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        )
    }
}

LineOrQuadraticCurve.propTypes = {
    points: CurveShape.isRequired,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number
};

LineOrQuadraticCurve.defaults = {
    stroke: 'black',
    strokewidth: 2
};

export default LineOrQuadraticCurve