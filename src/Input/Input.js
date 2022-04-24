import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { guessword } from '../actions';

const Input = () => {
	const dispatch = new useDispatch();
	const [ currentGuess, setCurrentGuess ] = React.useState('');
	const success = useSelector((state) => state.success);
	if (success) {
		return <div data-test="input-component" />;
	} else {
		return (
			<div data-test="input-component">
				<form>
					<input
						type="text"
						className="mb-2 mx-sm-3"
						onChange={(e) => setCurrentGuess(e.target.value)}
						value={currentGuess}
                        data-test='input-box'
					/>
					<button
						className="btn btn-primary mb-2 ml-2"
						onClick={(e) => {
							e.preventDefault();
							dispatch(guessword(currentGuess));
							setCurrentGuess('');
						}}
                        data-test='submit-button'
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
};

export default Input;
