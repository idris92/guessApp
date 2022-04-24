import React from 'react';
import PropTypes from 'prop-types';

const Congrat = (props) => {
	if (props.success) {
		return (
			<div className="alert alert-success" data-test="congrat-component">
				<span data-test="congrat-message">Congratulations! You guessed the word!</span>
			</div>
		);
	} else {
		return <div data-test="congrat-component" />;
	}
};

Congrat.propTypes = {
	success: PropTypes.bool
};
export default Congrat;
