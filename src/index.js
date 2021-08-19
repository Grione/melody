import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import settings from './mocks/settings';

const init = () => {
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
