import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';

const App = (props) => {
	const { gameTime, errorCount, welcomeButtonHandler } = props;
	return <WelcomeScreen time={gameTime} errorCount={errorCount} onWelcomeButtonClick={welcomeButtonHandler} />;
};

App.propTypes = {
	errorCount: PropTypes.number.isRequired,
	gameTime: PropTypes.number.isRequired,
	welcomeButtonHandler: PropTypes.func.isRequired
};

export default App;
