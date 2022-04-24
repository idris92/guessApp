import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import Congrat from './Congrat';
import { checkProps } from '../test/testUtils';

const setup = (props = {}) => {
	return shallow(<Congrat {...props} />);
};

test('does not through error with expected props', () => {
	const expectedProps = { success: true };
	checkProps(Congrat, expectedProps);
});

test('render without error', () => {
	let wrapper = setup();
	const congratComponent = findByTestAttr(wrapper, 'congrat-component');
	expect(congratComponent.length).toBe(1);
});

test('no success message when success is false', () => {
	const wrapper = setup({ success: false });
	const successMessage = findByTestAttr(wrapper, 'congrat-component');
	expect(successMessage.text()).toBe('');
});

test('success message when success is true', () => {
	const wrapper = setup({ success: true });
	const successMessage = findByTestAttr(wrapper, 'congrat-component');
	expect(successMessage.text().length).not.toBe(0);
});
