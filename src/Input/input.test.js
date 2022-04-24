import { mount } from 'enzyme';
import Input from './Input';
import { Provider } from 'react-redux';
import { findByTestAttr,  storeFactory } from '../test/testUtils';
import React from 'react';

//We decided to leave the setup here instead of doing it in util because we need to pass a props to it
const setup = (initialState = {}, secretWord = 'party') => {
	const store = storeFactory(initialState);
	return mount(
		<Provider store={store}>
			<Input secretWord={secretWord} />
		</Provider>
	);
};

test('renders without errors', () => {
	const wrapper = setup({ success: false });
	const InputComponent = findByTestAttr(wrapper, 'input-component');
	expect(InputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
	let wrapper;
	let mockSetCurrentGuess = jest.fn();
	let originalUseState;

	//perform this operation before running the tests
	beforeEach(() => {
		//clear the state for any previous data
		mockSetCurrentGuess.mockClear();
		//keeps the original state before making changes
		originalUseState = React.useState;
		//set the new state
		React.useState = jest.fn(() => [ '', mockSetCurrentGuess ]);
		//set wrapper
		wrapper = setup({ success: false });
	});

	//perform this operations after running the test
	afterEach(() => {
		//this will reset the state to its originalState
		React.useState = originalUseState;
	});
	test('state update when the input change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box');

		//create a mock event
		const mockEvent = { target: { value: 'train' } };
		//simulate a onchange event
		inputBox.simulate('change', mockEvent);
		//expect the state to have been update
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
	});

	test('Input field is cleared upon submit button click', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button');
		submitButton.simulate('click', { preventDefault() {} });
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
	});
});

describe('components rendered when success is true or false', () => {
	describe('success is true', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup({ success: true });
		});

		test('Input component renders without error', () => {
			const InputComponent = findByTestAttr(wrapper, 'input-component');
			expect(InputComponent.length).toBe(1);
		});

		test('input box does not show', () => {
			const InputBox = findByTestAttr(wrapper, 'input-box');
			expect(InputBox.exists()).toBe(false);
		});

		test('submit does not show', () => {
			const SubmitButton = findByTestAttr(wrapper, 'submit-button');
			expect(SubmitButton.exists()).toBe(false);
		});
	});

	describe('success is false', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup({ success: false });
		});

		test('Input compoennt renders without error', () => {
			const InputComponent = findByTestAttr(wrapper, 'input-component');
			expect(InputComponent.length).toBe(1);
		});

		test('Input box show', () => {
			const InputBox = findByTestAttr(wrapper, 'input-box');
			expect(InputBox.exists()).toBe(true);
		});

		test('submit to show', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.exists()).toBe(true);
		});
	});
});
