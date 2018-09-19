import React from 'react';
import VirtualButton from '../app/VirtualButton';
import renderer from 'react-test-renderer';

describe('VirtualButton', () => {
    const props = {
        name: "testButton",
        value: "Test",
        className: "testClass",
        clickHandler: (e) => {}
    };

    it('renders correctly', () => {
        const tree = renderer.create(<VirtualButton {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
