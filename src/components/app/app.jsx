import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import questions from '../../mocks/questions';

class App extends React.PureComponent {
	_getScreen(question) {
		if (!question) {
			const { gameTime, maxMistakes, onWelcomeButtonClick } = this.props;
			return (
				<WelcomeScreen time={gameTime} maxMistakes={maxMistakes} onWelcomeButtonClick={onWelcomeButtonClick} />
			);
		}
		const { onUserAnswer, mistakes, maxMistakes } = this.props;
		const currentQuestion = question;

		switch (currentQuestion.type) {
			case `genre`:
				return (
					<GenreQuestionScreen
						question={currentQuestion}
						onAnswer={(userAnswer) => onUserAnswer(userAnswer, question, mistakes, maxMistakes)}
					/>
				);
			case `artist`:
				return <ArtistQuestionScreen question={currentQuestion} onAnswer={onUserAnswer} />;
		}

		return null;
	}

	state = {
		question: -1
	};

	render() {
		const { step, questions } = this.props;
		console.log(this.props);
		return this._getScreen(questions[step]);
	}
}

App.propTypes = {
	mistakes: PropTypes.number.isRequired,
	maxMistakes: PropTypes.number.isRequired,
	gameTime: PropTypes.number.isRequired,
	questions: PropTypes.array.isRequired,
	step: PropTypes.number.isRequired,
	onUserAnswer: PropTypes.func.isRequired,
	onWelcomeButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
	Object.assign({}, ownProps, { step: state.step, mistakes: state.mistakes });

const mapDispatchToProps = (dispatch) => ({
	onWelcomeButtonClick: () => dispatch(ActionCreator.incrementStep()),

	onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
		dispatch(ActionCreator.incrementStep());
		dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
	}
});

export { App };

export default connect(mapStateToProps, mapDispatchToProps)(App);
