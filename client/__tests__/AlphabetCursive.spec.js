import React from 'react';
import AlphabetCursive from '../app/AlphabetCursive';
import {shallow} from 'enzyme';

describe('AlphabetCursive', () => {
    it('empty curves', () => {
        expect(shallow(<AlphabetCursive origCurves={[]} origWidth={300} origHeight={300}/>)).toMatchSnapshot();
    });

    it('with curves', () => {
        const component = shallow(
            <AlphabetCursive
                origCurves={[[{"x": 10, "y": 10}, {"x": 10, "y": 20}], [{"x": 20, "y": 40}, {"x": 20, "y": 60}]]}
                origWidth={200}
                origHeight={200}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
