import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import questions from '../../mocks/questions';

class App extends React.PureComponent {
	static getScreen(question, props, onUserAnswer) {
		if (question === -1) {
			const { gameTime, errorCount } = props;
			return <WelcomeScreen time={gameTime} errorCount={errorCount} onWelcomeButtonClick={onUserAnswer} />;
		}
		const { questions } = props;
		const currentQuestion = questions[question];

		switch (currentQuestion.type) {
			case `genre`:
				return <GenreQuestionScreen question={currentQuestion} onAnswer={onUserAnswer} />;
			case `artist`:
				return <ArtistQuestionScreen question={currentQuestion} onAnswer={onUserAnswer} />;
		}

		return null;
	}
	constructor(props) {
		super(props);

		this.state = {
			question: -1
		};
	}

	render() {
		const { question } = this.state;

		return App.getScreen(question, this.props, () => {
			this.setState((prevState) => {
				const nextIndex = prevState.question + 1;
				const isEnd = nextIndex >= questions.length;

				return {
					...prevState,
					question: !isEnd ? nextIndex: -1,
				};
			});
		});
	}
}

App.propTypes = {
	errorCount: PropTypes.number.isRequired,
	gameTime: PropTypes.number.isRequired
};

export default App;
