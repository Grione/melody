import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app/app.jsx';
import { reducer } from './reducer';
import settings from './mocks/settings';
import questions from './mocks/questions';

const init = (gameQuestion) => {
	const { errorCount, gameTime } = settings;
	const store = createStore(reducer);
  
	ReactDOM.render(
		<Provider store={store}>
			<App maxMistakes={errorCount} gameTime={gameTime} questions={gameQuestion} />
		</Provider>,
		document.querySelector(`#root`)
	);
};

init(questions);
