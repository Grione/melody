import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';

const App = (props) => {
	const { gameTime, errorCount } = props;
	return <WelcomeScreen time={gameTime} errorCount={errorCount} />;
};

App.propTypes = {
	mistakes: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	time: PropTypes.number.isRequired
};

export default App;
