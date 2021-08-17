import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const init = () => {
	const settings = {
		gameTime: 5,
		errorCount: 3,
		welcomeButtonHandler: () => {}
	};

	ReactDOM.render(
		<App
			errorCount={settings.errorCount}
			gameTime={settings.gameTime}
			welcomeButtonHandler={settings.welcomeButtonHandler}
		/>,
		document.querySelector(`#root`)
	);
};

init();
