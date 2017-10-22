import * as React from 'react';
import '../../enzyme.adapter';
import { mount } from 'enzyme';
import { ButtonProps, Button } from './Button';
import { getSpecWrapper } from '../../__tests__/utils';

const props: ButtonProps = {
    name: 'Save',
    onClick: jest.fn(),
    type: 'primary'
};
const ButtonReact = mount(<Button name={props.name} onClick={props.onClick} type={props.type} />);
const buttonDivReact = getSpecWrapper(
    ButtonReact,
    `button-${props.type}-${props.name.toLowerCase()}`
);

describe('Button Component', () => {
    it('Renders', () => {
        expect(buttonDivReact).toBePresent();
    });

    it('Renders with the right CSS classes', () => {
        expect(buttonDivReact.hasClass('primary')).toBeTruthy();
    });

    it('Renders with the right name', () => {
        expect(buttonDivReact.text()).toEqual('Save');
    });

    it('Executes onClick callback when clicked', () => {
        buttonDivReact.simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    });
});
