import {flattenCurve, scaleCoOridnate, scaleCurveCoOrdinates, scaleCurvesCoOrdinates} from "../app/AlphabetUtils.js";
import {initialGameState, calculateNextState, isCloseProximity} from "../app/AlphabetUtils.js";

test('should return empty array', () => {
    expect(flattenCurve(null)).toEqual([])
});

test('should return flattened co-ordinates', () => {
    expect(flattenCurve([{x: 10, y: 20}, {x: 15, y: 25}])).toEqual([10, 20, 15, 25])
});

test('scale (10, 20) by (0.8, 0.4)', () => {
    expect(scaleCoOridnate({x: 10, y: 20}, {x: 0.8, y: 0.4})).toEqual({x: 8, y: 8});
});

test('scale [(10, 20), (20, 10)] by (0.8, 0.4)', () => {
    expect(scaleCurveCoOrdinates([{x: 10, y: 20}, {x: 20, y: 10}], {x: 0.8, y: 0.4})).toEqual([{x: 8, y: 8}, {x: 16, y: 4}]);
});

test('scale [[(10, 20)], [(20, 10)]] by (0.8, 0.4)', () => {
    expect(scaleCurvesCoOrdinates([[{x: 10, y: 20}], [{x: 20, y: 10}]], {x: 0.8, y: 0.4})).toEqual([[{x: 8, y: 8}], [{x: 16, y: 4}]]);
});


test('when curve has next state', () => {
    const curves = [[{x: 20, y: 10}, {x: 20, y: 30}, {x: 30, y: 40}]];
    const gameState = initialGameState();

    expect(calculateNextState(curves, gameState)).toEqual({currentCurveIdx: 0, currentPointIdx: 1, nextCurveIdx: 0, nextPointIdx: 2});
});

test('should return last state when no next state', () => {
    const curves = [[{x: 20, y: 10}, {x: 20, y: 30}, {x: 30, y: 40}]];
    const gameState = {currentCurveIdx: 0, currentPointIdx: 1, nextCurveIdx: 0, nextPointIdx: 2};

    expect(calculateNextState(curves, gameState)).toEqual({currentCurveIdx: 0, currentPointIdx: 2, nextCurveIdx: 0, nextPointIdx: 2});
});

test('should return last state when current state is invalid', () => {
    const curves = [[{x: 20, y: 10}, {x: 20, y: 30}, {x: 30, y: 40}]];
    const lastState = {currentCurveIdx: 0, currentPointIdx: 2, nextCurveIdx: 0, nextPointIdx: 2};

    expect(calculateNextState(curves, {currentCurveIdx: 1, currentPointIdx: 2, nextCurveIdx: -1, nextPointIdx: -3})).toEqual(lastState);
});

test('should return next curve', () => {
    const curves = [[{x: 20, y: 10}, {x: 20, y: 30}, {x: 30, y: 40}], [{x: 40, y: 50}, {x: 40, y: 60}]];
    const gameState = {currentCurveIdx: 0, currentPointIdx: 1, nextCurveIdx: 0, nextPointIdx: 2};

    expect(calculateNextState(curves, gameState)).toEqual({currentCurveIdx: 1, currentPointIdx: 0, nextCurveIdx: 1, nextPointIdx: 1});
});

test('should return true', () => {
    expect(isCloseProximity({x: 10, y: 10}, {x: 11, y: 12}, 5)).toEqual(true);
    expect(isCloseProximity({x: 10, y: 10}, {x: 14, y: 14}, 5)).toEqual(true);
    expect(isCloseProximity({x: 10, y: 10}, {x: 6, y: 6}, 5)).toEqual(true);
    expect(isCloseProximity({x: 10, y: 10}, {x: 14, y: 15}, 5)).toEqual(false);
    expect(isCloseProximity({x: 10, y: 10}, {x: 5, y: 6}, 5)).toEqual(false);
});