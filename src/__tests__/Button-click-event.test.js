import React from 'react';
import { create } from 'react-test-renderer';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ text: ''};
        this.handleClick = this.handleClick.bind(this);
    
    }

    handleClick() {
        this.setState(() => {
            return { text: 'TEST PASSED'};
        });
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.text}
            </button>
        );
    }
}

describe('Button component', () => {
    test('it shows the expected text clicked', () => {
        const component = create(<Button text='EXAMPLE' />);
        const instance = component.root;
        const button = instance.findByType('button');
        button.props.onClick();
        expect(button.props.children).toBe('TEST PASSED');
    });
});