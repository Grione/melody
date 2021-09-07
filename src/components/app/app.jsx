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
				return (
					<ArtistQuestionScreen
						question={currentQuestion}
						onAnswer={(userAnswer) => onUserAnswer(userAnswer, question, mistakes, maxMistakes)}
					/>
				);
		}

		return null;
	}

	render() {
		const { step, questions } = this.props;

		return (
			<section className="game game--artist">
				<header className="game__header">
					<a className="game__back" href="#">
						<span className="visually-hidden">Сыграть ещё раз</span>
						<img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
					</a>

					<svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
						<circle
							className="timer__line"
							cx="390"
							cy="390"
							r="370"
							style={{
								filter: `url(#blur)`,
								transform: `rotate(-90deg) scaleY(-1)`,
								transformOrigin: `center`
							}}
						/>
					</svg>

					<div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
						<span className="timer__mins">05</span>
						<span className="timer__dots">:</span>
						<span className="timer__secs">00</span>
					</div>

					<div className="game__mistakes">
						<div className="wrong" />
						<div className="wrong" />
						<div className="wrong" />
					</div>
				</header>
				{this._getScreen(questions[step])}
			</section>
		);
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
