import React from 'react';
import AlphabetCursive from '../app/AlphabetCursive';
import {shallow} from 'enzyme';

describe('AlphabetCursive', () => {
    beforeEach(() => {
        window = {
            ...window,
            innerHeight: 400,
            addEventListener: () => {},
            removeEventListener: () => {}
        }
    });

    it('with curves', () => {
        const component = shallow(
            <AlphabetCursive
                origCurves={[[{"x": 10, "y": 10}, {"x": 10, "y": 20}, {"x": 15, "y": 15}], [{"x": 20, "y": 40}, {"x": 20, "y": 60}]]}
                origWidth={200}
                origHeight={200}
            />
        );
        const instance = component.instance;
        instance.refs = {
            container: {
                offsetWidth: 500
            }
        };
        expect(component).toMatchSnapshot();
    });
});
