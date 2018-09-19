/**
 * Scale one point
 * @param p
 * @param scale
 * @returns {{x: number, y: number}}
 */
export function scaleCoOridnate(p, scale) {
    return {x: p.x * scale.x, y: p.y * scale.y}
}

/**
 * Scale all points in curve
 * @param curve
 * @param scale
 * @returns {Array}
 */
export function scaleCurveCoOrdinates(curve, scale) {
    return curve.map((p) => scaleCoOridnate(p, scale));
}

/**
 * Scale an array of curves
 * @param curves
 * @param scale
 */
export function scaleCurvesCoOrdinates(curves, scale) {
    return curves.map(curve => scaleCurveCoOrdinates(curve, scale));
}

/**
 * returns an array by flattening the x, y co-ordinates of the points in the curve
 *
 * @param curve
 * @returns {Array}
 */
export function flattenCurve(curve) {
    const flat = [];
    curve && curve.map(p => {
        flat.push(p.x);
        flat.push(p.y);
    });
    return flat;
}

/**
 * @returns initial state of the game
 */
export function initialGameState() {
    return {
        currentCurveIdx: 0,
        currentPointIdx: 0,
        nextCurveIdx: 0,
        nextPointIdx: 1
    };
}

/**
 * Given an array of curves, and the current state of the game,
 * calculates the next state of the game.
 *
 * @param curves
 * @param currentState
 * @returns nextState
 */
export function calculateNextState(curves, currentState) {
    if (curves[currentState.currentCurveIdx] && curves[currentState.currentCurveIdx].length > currentState.nextPointIdx + 1) {
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

export function isCloseProximity(point1, point2, delta) {
    return Math.abs(point1.x - point2.x) < delta
        && Math.abs(point1.y - point2.y) < delta;
}

