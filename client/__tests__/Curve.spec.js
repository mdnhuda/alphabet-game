import React from 'react';
import Curve from '../app/LineOrQuadraticCurve';
import {shallow} from 'enzyme';

describe('LineOrQuadraticCurve', () => {
    it('renders correctly', () => {
        const component = shallow(
            <Curve points={[{"x": 10, "y": 10}, {"x": 10, "y": 20}, {"x": 15, "y": 15}]}
                   stroke={'red'}
                   strokeWidth={3}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
