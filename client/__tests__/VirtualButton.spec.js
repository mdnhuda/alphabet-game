import React from 'react';
import VirtualButton from '../app/VirtualButton';
import {shallow} from 'enzyme';

describe('VirtualButton', () => {
    const props = {
        name: "testButton",
        value: "Test",
        className: "testClass",
        clickHandler: (e) => {}
    };

    it('renders correctly', () => {
        const component = shallow(<VirtualButton {...props}/>);
        expect(component).toMatchSnapshot();
    });
});
