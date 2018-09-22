import React from 'react';
import {shallow} from 'enzyme';
import AlphabetGuidedCanvas from '../app/AlphabetGuidedCanvas';

describe('AlphabetGuidedCanvas', () => {
    const curvesData = {
        origCurves: [[{"x": 10, "y": 10}, {"x": 10, "y": 100}, {"x": 50, "y": 50}], [{"x": 20, "y": 40}, {"x": 20, "y": 60}]],
        origWidth: 400,
        origHeight: 400
    };

    beforeEach(() => {
        window = {
            ...window,
            innerHeight: 400,
            addEventListener: () => {
            },
            removeEventListener: () => {
            }
        }
    });

    it('state transitions', () => {
        const point0 = curvesData.origCurves[0][0];
        const arbitraryPoint = {"x": 10, "y": 50};
        const point1 = curvesData.origCurves[0][1];
        const point2 = curvesData.origCurves[0][2];

        const createEvent = (pos) => { return {
            "target": {
                getStage: () => {
                    return {
                        getPointerPosition: () => {
                            return pos;
                        }
                    }

                }
            }
        }};
        const component = shallow(<AlphabetGuidedCanvas {...curvesData} />);
        expect(component).toMatchSnapshot();

        // mouse down on an arbitrary point
        component.find('Stage').simulate('mousedown', createEvent(arbitraryPoint));
        expect(component.state().lineStart).toEqual(null);

        // mouse down on the curve start point
        component.find('Stage').simulate('mousedown', createEvent(point0));
        expect(component.state().lineStart).toEqual(point0);

        // mouse moves to an arbitrary point - both line start/end selected
        component.find('Stage').simulate('mousemove', createEvent(arbitraryPoint));
        expect(component.state().lineStart).toEqual(point0);
        expect(component.state().lineEnd).toEqual(arbitraryPoint);

        // mouse up event on an arbitrary point - both line start/end un-selected
        component.find('Stage').simulate('mouseup', createEvent(arbitraryPoint));
        expect(component.state().lineStart).toEqual(null);
        expect(component.state().lineEnd).toEqual(null);

        expect(component.state().gameState).toEqual({
            currentCurveIdx: 0,
            currentPointIdx: 0,
            nextCurveIdx: 0,
            nextPointIdx: 1
        });

        // mouse down on the start point, then mouse moves to the end-point,
        // should select next state, lineStart should be selected
        component.find('Stage').simulate('mousedown', createEvent(point0));
        component.find('Stage').simulate('mousemove', createEvent(point1));
        expect(component.state().gameState).toEqual({
            currentCurveIdx: 0,
            currentPointIdx: 1,
            nextCurveIdx: 0,
            nextPointIdx: 2
        });
        expect(component.state().lineStart).toEqual(point1);
        expect(component.state().lineEnd).toEqual(null);

        // when mouse up happens on the last point of the curve, next curve is selected
        component.find('Stage').simulate('mouseup', createEvent(point2));
        expect(component.state().gameState).toEqual({
            currentCurveIdx: 1,
            currentPointIdx: 0,
            nextCurveIdx: 1,
            nextPointIdx: 1
        });
        expect(component.state().lineStart).toEqual(null);
        expect(component.state().lineEnd).toEqual(null);

    });
});


