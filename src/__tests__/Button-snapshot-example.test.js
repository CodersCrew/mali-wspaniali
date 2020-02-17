import React from 'react';
import { create } from 'react-test-renderer';

function Button(props) {
    return <button>Example button</button>;
}

describe('Button component', () => {
    test('Matches the snapshot', () => {
        const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
    });
});